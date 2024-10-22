# Generated by Django 5.0.6 on 2024-07-05 23:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cabin_site", "0003_user_cabin_votes"),
    ]

    operations = [
        migrations.AlterField(
            model_name="trip",
            name="cabins",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="cabin_site.cabin",
            ),
        ),
    ]
