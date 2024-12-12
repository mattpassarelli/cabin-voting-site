# Generated by Django 5.0.9 on 2024-12-12 22:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cabin_site", "0004_cabin"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cabin",
            name="price",
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name="cabin",
            name="trip",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.DO_NOTHING,
                related_name="cabins",
                to="cabin_site.trip",
            ),
        ),
    ]