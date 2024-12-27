from djoser.email import ActivationEmail

class CustomActivationEmail(ActivationEmail):
    template_name = 'email/activation.html'
    
    def get_context_data(self):
        context = super().get_context_data()
        query_params = self.request.query_params
        redirect_id = query_params.get('redirect_id')
        if redirect_id:
            context['url'] += f'?redirect_id={redirect_id}'

        return context