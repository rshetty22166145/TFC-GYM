# Generated by Django 4.1.3 on 2022-11-13 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0016_remove_class_current_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='cancel',
            field=models.BooleanField(default=False),
        ),
    ]