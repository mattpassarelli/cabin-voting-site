from django.contrib import admin
from .models import Trip, Cabin, User


class TripAdmin(admin.ModelAdmin):
    list_display = ("year", "start_date", "end_date", "date_created", "last_modified")


class CabinAdmin(admin.ModelAdmin):
    list_display = ("id", "state", "city", "things_to_do", "listing_url", "image_url")


class UserAdmin(admin.ModelAdmin):
    list_display = ["name"]


# Register your models here.
admin.site.register(Trip, TripAdmin)
admin.site.register(Cabin, CabinAdmin)
admin.site.register(User, UserAdmin)
