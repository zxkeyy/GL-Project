from django.conf import settings
from django.utils.crypto import get_random_string
from django.utils import timezone

from .models import PhoneVerification

DEFAULT_TOKEN_LENGTH = 6
DEFAULT_CODE_EXPIRATION_TIME = 300


class PhoneVerificationBackend(object):
    SECURITY_CODE_VALID = 0
    SECURITY_CODE_INVALID = 1
    SECURITY_CODE_EXPIRED = 2
    SECURITY_CODE_VERIFIED = 3

    # Not actually implemented yet
    def send_sms(self, number, message):
        print(f"Sending SMS to {number}: {message}")
        return True
    
    @classmethod
    def generate_security_code(cls):
        token_length = settings.PHONE_VERIFICATION.get("TOKEN_LENGTH", DEFAULT_TOKEN_LENGTH)
        return get_random_string(length=token_length, allowed_chars='0123456789')
    
    @classmethod
    def check_security_code_expiration(cls, stored_verification):
        time_difference = timezone.now() - stored_verification.created_at

        if time_difference.seconds > settings.PHONE_VERIFICATION.get("CODE_EXPIRATION_TIME", DEFAULT_CODE_EXPIRATION_TIME):
            return False
        return True

    def create_phone_verification(self, user, phone_number):
        code = self.generate_security_code()

        PhoneVerification.objects.create(user=user, phone_number=phone_number, code=code)

        return code
    
    def verify_phone_number(self, user, phone_number, code):
        try:
            stored_verification = PhoneVerification.objects.get(user=user, phone_number=phone_number, code=code)
        except PhoneVerification.DoesNotExist:
            return self.SECURITY_CODE_INVALID

        if stored_verification.is_verified:
            return self.SECURITY_CODE_VERIFIED

        if not self.check_security_code_expiration(stored_verification):
            return self.SECURITY_CODE_EXPIRED

        stored_verification.is_verified = True
        stored_verification.save()

        user.phone_number = phone_number
        user.save()

        return self.SECURITY_CODE_VALID