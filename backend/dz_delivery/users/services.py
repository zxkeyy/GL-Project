from django.conf import settings
from .backend import PhoneVerificationBackend

import logging

logger = logging.getLogger(__name__)

DEFAULT_MESSAGE = (
    "Welcome to Blitz, Your verification code is: {code}"
)

class PhoneVerificationService(object):
    phone_verification_settings = getattr(settings, 'PHONE_VERIFICATION', {})
    verification_message = phone_verification_settings.get("MESSAGE", DEFAULT_MESSAGE)

    def __init__(self):
        self.backend = PhoneVerificationBackend()

    def send_verification_code(self, phone_number, code):
        message = self.verification_message.format(code=code)
        self.backend.send_sms(phone_number, message)


def create_phone_verification_and_send_code(user, phone_number):
    service = PhoneVerificationService()
    code = service.backend.create_phone_verification(user, phone_number)

    try:
        service.send_verification_code(phone_number, code)
    except Exception as e:
        logger.error(f'Error sending verification code to {phone_number}: {e}')
    
    return {'phone_number': phone_number}