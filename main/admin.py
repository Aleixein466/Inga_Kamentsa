from django.contrib import admin
from .models import Evento, Familia, Usuario, UsuarioEvento, UsuarioFamilia

# Admin legacy — web/ Firestore es canónico, este admin solo para plantilla Django legada.
# Registra modelos vigentes; catálogos Tipo* deprecados no se registran (ver main/models.py + web/FIREBASE_MIGRATION.md).

@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "fecha_inicio", "fecha_fin", "es_favorito")
    list_filter = ("es_favorito",)
    search_fields = ("nombre",)

@admin.register(Familia)
class FamiliaAdmin(admin.ModelAdmin):
    list_display = ("n_familia",)
    search_fields = ("n_familia",)

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ("nombres", "apellidos", "n_documento", "zona", "localidad")
    search_fields = ("nombres", "apellidos", "n_documento")
    list_filter = ("zona",)

@admin.register(UsuarioEvento)
class UsuarioEventoAdmin(admin.ModelAdmin):
    list_display = ("usuario", "evento", "fecha_asistencia", "asistencia")
    list_filter = ("asistencia", "evento")

@admin.register(UsuarioFamilia)
class UsuarioFamiliaAdmin(admin.ModelAdmin):
    list_display = ("usuario", "familia", "parentesco")
