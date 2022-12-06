from django import forms
from django.utils.translation import gettext_lazy as _
from .models import UserPaymentDetails,UserPayments


class UserPaymentDetailsForm(forms.ModelForm):
    class Meta:
        # We specify the model that we want to create a form from
        model = UserPaymentDetails

        # We can specify the fields that we want to include in the form by setting the fields parameter of the meta class to a list of field names
        # We can also specify the fields that we want to exclude from the form by setting the exclude parameter of the meta class to a list of field names
        # see https://docs.djangoproject.com/en/4.1/topics/forms/modelforms/#selecting-the-fields-to-use for more details
        # ADDITION: chose to include "text" and "reply_to" fields by setting the fields parameter 
        fields = ["cardnumber", "cvv", "expiry"]

        # We can specify the widgets that we want to use to render the fields on the form
        # We can do this by defining a widgets class variable on the meta class
        # This class variable should be a dictionary that maps the name of the field to the widget that we want to use to render the field
        # We can use the django.forms.Textarea class to create a widget that renders a text area
        # We can also use the django.forms.TextInput class to create a widget that renders a text input
        # We can also use the django.forms.HiddenInput class to create a widget that renders a hidden input
        widgets = {
            "cardnumber": forms.Textarea(attrs={"rows": 1}),
            "cvv": forms.Textarea(attrs={"rows": 1}),
            "expiry": forms.Textarea(attrs={"rows": 1}),
        } 