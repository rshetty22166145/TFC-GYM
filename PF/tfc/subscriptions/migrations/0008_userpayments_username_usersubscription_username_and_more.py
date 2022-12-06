# Generated by Django 4.1.3 on 2022-11-14 21:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('subscriptions', '0007_usersubscription_next_pay'),
    ]

    operations = [
        migrations.AddField(
            model_name='userpayments',
            name='username',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='usersubscription',
            name='username',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='userpayments',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users2', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='UserPaymentDetails',
        ),
    ]