from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import CASCADE
from accounts.models import UserProfile


# Sub plans

class SubcriptionPlan(models.Model):
    name = models.CharField(max_length=150)
    price = models.FloatField()
    description = models.TextField()
    PLAN_CHOICES = (
        ("Yearly", "Yearly"),
        ("Monthly", "Monthly")
    )
    plan = models.CharField(max_length=100, choices=PLAN_CHOICES, default="x")

    def __str__(self):
        return self.name


class UserSubscription(models.Model):
    user = models.ForeignKey(to=get_user_model(), on_delete=models.CASCADE, related_name="users1")
    username = models.CharField(max_length=100, null=True)
    curr_plan = models.ForeignKey(to=SubcriptionPlan, on_delete=CASCADE, editable=True, related_name="plans")
    renew = models.BooleanField(editable=True, default=True)
    last_paid = models.DateField(auto_now_add=True, editable=True)
    next_pay = models.DateField(null=True, editable=True)
    cardnumber = models.CharField(editable=True, max_length=100)
    cvv = models.CharField(editable=True, max_length=100)
    expiry = models.CharField(help_text="Enter as MMYY", editable=True, max_length=100)


class UserPayments(models.Model):
    user = models.ForeignKey(to=get_user_model(), on_delete=models.CASCADE, related_name="users2")
    username = models.CharField(max_length=100, null=True)
    cardnumber = models.PositiveIntegerField(editable=True)
    amount = models.FloatField()
    pay_date = models.DateField(auto_now_add=True, editable=True)
    pay_time = models.TimeField(auto_now_add=True, editable=True)
    next_pay = models.DateField(null=True, editable=True)
