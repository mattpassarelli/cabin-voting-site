# Generated by Django 5.0.9 on 2024-12-15 17:27

import django.db.models.deletion
import django.db.models.functions.datetime
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "user_id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("first_name", models.CharField(max_length=50)),
                ("last_name", models.CharField(max_length=50)),
                (
                    "created",
                    models.DateTimeField(
                        blank=True, db_default=django.db.models.functions.datetime.Now()
                    ),
                ),
                (
                    "last_updated",
                    models.DateTimeField(
                        blank=True, db_default=django.db.models.functions.datetime.Now()
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
                ("is_admin", models.BooleanField(default=False)),
                ("is_staff", models.BooleanField(default=True)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Trip",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                ("last_modified", models.DateTimeField(auto_now=True)),
                ("name", models.CharField()),
                ("is_active", models.BooleanField(db_default=True)),
            ],
        ),
        migrations.CreateModel(
            name="Cabin",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("state", models.CharField(max_length=2)),
                ("city", models.CharField()),
                ("things_to_do", models.TextField(blank=True, null=True)),
                ("listing_url", models.URLField(max_length=1000)),
                ("image_url", models.URLField(blank=True, max_length=1000)),
                ("price", models.IntegerField()),
                ("is_active", models.BooleanField(db_default=True)),
                (
                    "submitter",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "votes",
                    models.ManyToManyField(
                        blank=True, related_name="votes", to=settings.AUTH_USER_MODEL
                    ),
                ),
                (
                    "trip",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="cabins",
                        to="cabin_site.trip",
                    ),
                ),
            ],
        ),
    ]
