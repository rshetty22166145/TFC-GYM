# Generated by Django 4.1.3 on 2022-11-17 04:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0009_userpayments_expiry'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userpayments',
            name='expiry',
        ),
        migrations.AddField(
            model_name='userpayments',
            name='next_pay',
            field=models.DateField(null=True),
        ),
    ]
