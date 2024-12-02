from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class AuthenticationTestCase(TestCase):
    def setUp(self):
        """
        Set up test environment before each test method
        - Create a test client
        - Create a test user
        """
        self.client = APIClient()
        self.register_url = reverse('user-list')
        self.login_url = reverse('jwt-create')
        
        # Test user credentials
        self.user_data = {
            'email': 'testuser@example.com',
            'username': 'testuser',
            'password': 'TestPassword123!',
            'first_name': 'Test',
            'last_name': 'User'
        }
        
        # Create a test user
        self.user = User.objects.create_user(**self.user_data)

    def test_user_registration(self):
        """
        Test user registration process
        - Ensure new users can be created
        - Check registration returns correct status
        - Verify user is created in database
        """
        new_user_data = {
            'email': 'newuser@example.com',
            'username': 'newuser',
            'password': 'NewPassword456!',
            're_password': 'NewPassword456!',
            'first_name': 'New',
            'last_name': 'User'
        }
        
        response = self.client.post(self.register_url, new_user_data)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email=new_user_data['email']).exists())

    def test_user_login(self):
        """
        Test user login functionality
        - Verify successful login
        - Check JWT token generation
        - Ensure login fails with incorrect credentials
        """
        # Successful login
        login_credentials = {
            'username': self.user_data['username'],
            'password': self.user_data['password']
        }
        
        response = self.client.post(self.login_url, login_credentials)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_invalid_credentials(self):
        """
        Test login with invalid credentials
        - Ensure login fails with wrong password
        - Verify login fails with non-existent user
        """
        invalid_credentials = [
            {'username': self.user_data['username'], 'password': 'WrongPassword'},
            {'username': 'nonexistent', 'password': 'AnyPassword'}
        ]
        
        for creds in invalid_credentials:
            response = self.client.post(self.login_url, creds)
            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_token_refresh(self):
        """
        Test JWT token refresh mechanism
        - Generate refresh token
        - Verify new access token can be obtained
        """
        refresh = RefreshToken.for_user(self.user)
        
        refresh_data = {'refresh': str(refresh)}
        refresh_url = reverse('jwt-refresh')
        
        response = self.client.post(refresh_url, refresh_data)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_password_change(self):
        """
        Test user password change functionality
        - Authenticate user
        - Change password
        - Verify new password works
        """
        # Authenticate user
        self.client.force_authenticate(user=self.user)
        
        password_change_url = reverse('user-set-password')
        
        password_change_data = {
            'current_password': self.user_data['password'],
            'new_password': 'NewSecurePassword789!',
            're_new_password': 'NewSecurePassword789!'
        }
        
        response = self.client.post(password_change_url, password_change_data)
        print(response.data)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    