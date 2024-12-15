from django.db import models

from cabin_site.models.user import User


class Trip(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    date_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    name = models.CharField()
    is_active = models.BooleanField(db_default=True)
