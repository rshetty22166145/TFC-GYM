# Generated by Django 4.1.3 on 2022-11-13 22:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0005_userpayments_pay_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userpayments',
            name='paid',
        ),
        migrations.AddField(
            model_name='usersubscription',
            name='cardnumber',
            field=models.PositiveIntegerField(default=123),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usersubscription',
            name='cvv',
            field=models.PositiveIntegerField(default=123),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usersubscription',
            name='expiry',
            field=models.PositiveIntegerField(default=123, help_text='Enter as MMYY'),
            preserve_default=False,
        ),
    ]
