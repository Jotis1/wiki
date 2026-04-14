![Estado](https://img.shields.io/badge/Estado-Activo-green)
![Plataforma](https://img.shields.io/badge/Plataforma-Linux-orange)
![Tipo](https://img.shields.io/badge/Tipo-Referencia%20Admin-blue)
![Última actualización](https://img.shields.io/badge/Actualizado-2026-lightgrey)

# 🐧 Comandos Útiles para Administradores Linux

<!-- 🖼️ SUGERENCIA DE IMAGEN: Mapa mental con las categorías principales: Red, Disco, Procesos, Servicios, Seguridad, Monitoreo -->

---

## 📊 Memoria y CPU

```bash
free                        # Muestra la memoria
cat /proc/meminfo           # Muestra informe sobre la memoria

mpstat                      # Estadisticas procesador
ps aux |less                # Muestra los procesos
ps -ef | egrep -v "STIME|$LOGNAME" | sort -k4 -r | head -n 15 | colrm 100  # procesos que más cpu estan utilizando
ps -e -o uid,pid,ppid,pri,ni,cmd  # ver procesos con su prioridad
ps -u usuario -o pid,cmd   # procesos de un usuario
pkill -KILL -u usuario     # Matar sesion del usuario
```

nmon — Completa herramienta que muestra informacion de rendimiento de los diferentes componentes. No todos los sistemas tienen. En Ubuntu instalarlo con `sudo apt-get install nmon`

---

## 🌐 Descargar Ficheros y Navegación Web

```bash
wget                        # Para descargar archivos. MÃ¡s aquÃ­: http://www.linuxtotal.com.mx/?cont=info_admon_017
wget -r -np -nH --cut-dirs=3 -R index.html http://UrlADescargar  # Descargar URL con listado de directorios y subdirectorios (Mirar la opción --cut-dirs=3 porque igual no la queremos)
w3m -dump http://www.cyberciti.biz/  # Visualizamos en consola la página web
```

lynx — Navegador Browser de texto. En centOS lo instalamos así:

```bash
dnf config-manager --set-enabled PowerTools
dnf install lynx
lynx http://google.es
```

elinks — El mejor de todos

---

## 🖥️ Hostname

```bash
hostnamectl                              # Muestra el nombre del host
sudo hostnamectl set-hostname nuevoNombre  # para cambiar el nombre del host
```

---

## 🔐 sudo y Acceso Root

```bash
sudo -s          # Para no tener que escribir mÃ¡s veces sudo
sudo passwd root # Para habilitar root
```

```bash
find / -type d -name objects   # Buscar un directorio llamado objects
whereis nombreejecutable       # Buscar programa ejecutable (tambien man page y source)
whereis -b                     # (solo binary)
which firefox                  # buscar un ejecutable
```

---

## 💾 Guardar Salida a Fichero

```bash
script logfile.txt
# ahora ejecutamos todo lo que queramos
exit  # y guarda todo lo salido por la consola en logfile.txt
```

---

## ⚙️ Matar Procesos

```bash
kill
sudo pkill -9 -f syncd   # por proceso
killall
killall -9 PID           # fuerza
killall -i PID           # inmediatamente
ps -ef | grep defunct    # para saber el padre de un proceso difunto

pkill -KILL -u usuario   # Matar sesion del usuario
```

---

## 🖥️ Screen — Multiplexor de Terminal

Es un multiplexor de terminal. Permite abrir una sesión "virtual" dentro de tu terminal SSH. Esa sesión sigue viva aunque cierres la conexión SSH. Luego puedes volver a conectarte y "recuperarla" en cualquier momento.

```bash
sudo apt install screen
screen
```

- Desconectar: `Ctrl + a` luego `d`
- Volver: `screen -r`

Puedes nombrar tus sesiones:

```bash
screen -S nombre1
screen -S nombre2
```

Listar sesiones activas:

```bash
screen -ls
```

Reconectarte a una concreta:

```bash
screen -r nombre1
```

Si la sesión sigue "Attached" en otra terminal, puedes forzar la conexión compartida:

```bash
screen -x mi_sesion
# y salimos: Pulsa: Ctrl-a seguido de d
```

⚙️ 2️⃣ Matar una sesión concreta:

```bash
screen -S <nombre_o_pid> -X quit
```

---

## 🗜️ Comprimir / Descomprimir

```bash
gzip access.log
sudo apt install unzip
unzip access.log.zip                                       # descomprimir
gzip -d fichero.gz                                         # descomprimir
gzip -d /var/lib/psa/dumps/mysql.daily.dump.0.gz -c > /home/danimardo/database.sql
```

---

## 💾 Conocer el Tamaño (Espacio) de un Directorio

```bash
du -sh /var
du -sh /*
du -h --max-depth=1 | sort -hr   # Muestra el tamaño (espacio) en disco de los directorios a partir de donde estemos
ncdu .   # herramienta que de forma grafica (terminal) nos dice el espacio de los directorios y nos deja navegar x ellos
```

diskus — nos muestra el espacio ocupado x el directorio actual https://github.com/sharkdp/diskus

```bash
find / -type f -size +100M -exec ls -lh {} \;   # Ficheros de más de 100MB
sudo find / -type f -mmin -5                    # Ficheros modificados (o creados) en los últimos 5min
```

---

## ⚠️ Limitar el Uso de CPU por Usuario

Edita el archivo `/etc/security/limits.conf`:

```
fichaje.appsbecallgr hard cpu 50   # Limita al 50% de CPU a un usuario
```

```bash
sudo systemctl restart apache2  # Para Apache
sudo systemctl restart nginx    # Para Nginx
```

> 📌 **Nota:** Para ver los usuarios PAM ejecutar: `loginctl list-sessions`

---

## 🔒 chmod — Permisos de Ficheros

```
u: user -> usuario propietario
g: grupo -> grupo propietario. Para conocer el grupo propietario de una carpeta: stat /carpeta
o: otros
r: read
w: write
x: ejecutar
```

```bash
chmod u+r,g+x filename
chmod +x script.sh   # para un script
```

Por ejemplo, para restaurar los privilegios de un Joomla (y seguramente Wordpress):

```bash
find . -type d -exec chmod 0755 {} \;
find . -type f -exec chmod 0644 {} \;
```

Si queremos añadir un usuario al grupo de una carpeta para que tenga los privilegios de ese grupo:

```bash
sudo usermod -a -G groupname username
```

---

## 🔒 Chown — Cambiar el Propietario

```bash
chown whales /TestUnix
```

---

## 🔍 Grep

Para ver antes y despues:

```bash
grep -B 4 -A 4 xxxxx
grep "pepito" -B 4 -A 4 xxxxx
```

---

## 🔀 Redireccionar — Usar Salida como Entrada

```bash
cat $(ls pru*)   # Nos lista todos los ficheros que comiencen por pru y luego nos muestra su contenido
```

Mostrar contenido de algunos ficheros:

```bash
sudo cat $(find / -name pru*)
```

Utilizar la salida de ls para copiarlo a otro sitio:

```bash
ls | grep 632670817 | xargs -i cp {} ./copia2
```

---

## 🗄️ Ampliar un Volumen LVM (Procedimiento Actual)

> 💡 **Consejo:** Quiero agregar `/dev/sdb` (disco recién añadido) como nuevo espacio en `/`

```bash
lsblk          # Si el disco no tiene particiones, aparecerá como "disk" sin entradas debajo de él.
sudo vgdisplay  # Podemos ver el espacio asignado y sin asignar
sudo wipefs -a /dev/sdb                   # Limpia el disco (opcional, si ya estaba en uso antes)
sudo pvcreate /dev/sdb                    # Crear un volumen físico (PV) en /dev/sdb
                                          # Si es una particion seria: sudo pvcreate /dev/sda4
sudo pvs                                  # Verifica que el PV se haya creado correctamente
sudo vgs                                  # Vemos como está ahora el VG
sudo vgextend ubuntu-vg /dev/sdb          # Agregar el volumen físico al VG (ubuntu-vg)
sudo vgs                                  # Verifica que el grupo de volúmenes se haya extendido
```

Extender el volumen lógico montado en `/`:

```bash
# El "/dev/mapper/ubuntu--vg-ubuntu--lv" lo vemos con el comando "lsblk" en la linea donde está /
sudo lvextend -l +100%FREE /dev/mapper/ubuntu--vg-ubuntu--lv

# Después de extender el volumen lógico, redimensiona el sistema de archivos:
sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv   # ext4
# o en almalinux:
sudo xfs_growfs /

df -h  # Verificamos el nuevo tamaño
```

---

## 🗄️ Ampliar un Volumen LVM (Procedimiento Antiguo)

https://learning2xplore.medium.com/extend-lvm-partition-xfs-on-centos-7-18da909ad78b

Por ejemplo, tenemos un server y agregamos espacio nuevo al disco que ya tiene.
El disco es de 30GB y lo vamos a dejar en 40 (añadimos 10):

```bash
lsblk
```

```
NAME            MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
fd0               2:0    1    4K  0 disk
sda               8:0    0   30G  0 disk
+-sda1            8:1    0    1G  0 part /boot
+-sda2            8:2    0   29G  0 part
  +-centos-root 253:0    0   27G  0 lvm  /
  +-centos-swap 253:1    0    2G  0 lvm  [SWAP]
sr0              11:0    1 1024M  0 rom
```

```bash
df -lh
```

```
S.ficheros              Tamaño Usados  Disp Uso% Montado en
devtmpfs                  906M      0  906M   0% /dev
tmpfs                     919M      0  919M   0% /dev/shm
tmpfs                     919M   9,0M  910M   1% /run
tmpfs                     919M      0  919M   0% /sys/fs/cgroup
/dev/mapper/centos-root    27G   2,1G   25G   8% /
/dev/sda1                1014M   204M  811M  21% /boot
tmpfs                     184M      0  184M   0% /run/user/26
tmpfs                     184M      0  184M   0% /run/user/0
tmpfs                     184M      0  184M   0% /run/user/1000
```

Vemos que todo (casi) espacio esta en `/dev/mapper/centos-root` que es `/`.

**AMPLIAMOS → REINICIAMOS**

```bash
lsblk       # vemos 40G en sda
df -lh      # No hay cambios
fdisk -l    # en la primera línea vemos el nuevo tamaño
pvs         # veremos los volumenes fisicos
```

```
PV         VG     Fmt  Attr PSize   PFree
/dev/sda2  centos lvm2 a--  <29,00g 4,00m
```

Vemos que hay 29GB en un VolumeGroup llamado centOS en el volumen fisico /dev/sda2:

```bash
vgs   # vemos el volumen
lvs   # vemos los volumenes logicos
```

```
LV   VG     Attr       LSize  Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
root centos -wi-ao---- 26,99g
swap centos -wi-ao----  2,00g
```

**CREAMOS UNA PARTICION CON EL ESPACIO NUEVO:**

```bash
fdisk /dev/sda
# n -> nueva
# p -> primaria
# enter -> para que seleccione el numero por defecto (en este caso 3 xq ya hay 2)
# enter -> primer sector libre
# enter -> ultimo sector
# l -> listamos tipos de particion: 8e es LVM de linux
# t -> cambiar tipo de particion
#       3 (numero de particion) 8e
# w -> guardar y salir -> puede dar que recurso busy. Da igual, lo arreglamos en el siguiente comando

partprobe   # para que se aplique la nueva tabla sin reiniciar
fdisk -l    # veremos /dev/sda3 con los 10GB
pvs         # volvemos a ver los volumenes fisicos
```

```
PV         VG     Fmt  Attr PSize   PFree
/dev/sda2  centos lvm2 a--  <29,00g 4,00m
```

```bash
pvcreate /dev/sda3              # Creamos el volumen fisico
vgextend centos /dev/sda3       # Lo añadimos al VolumeGroup "centos"
fdisk -l                        # para ver el nombre completo de los volumenes que tenemos
                                # En este caso: /dev/mapper/centos-root
lvextend -l +100%FREE /dev/mapper/centos-root
xfs_growfs /dev/mapper/centos-root  # para asegurarnos de que ha extendido
df -h                           # para ver que ya guay
```

---

## 🐍 Python

```bash
sudo apt install python3
```

Crear alias para tener comando `python` y no tener que usar `python3`:

```bash
nano ~/.bashrc
# añadir: alias python='python3'
source ~/.bashrc
```

---

## 🕐 Cambiar la Hora a España

```bash
timedatectl
sudo timedatectl set-timezone Europe/Madrid
timedatectl status
```

---

## 🔗 SSHFS — Mapear Directorio Remoto

Mapear en local un directorio remoto por SSH.
Desde Windows con interfaz gráfico: https://github.com/winfsp/sshfs-win?tab=readme-ov-file

```bash
sudo apt install sshfs
sshfs usuario@servidor-remoto:/ruta/directorio/remoto ~/directorio_local
```

---

## 🗄️ Trabajar con Volúmenes LVM

```bash
lsblk  # Vemos los volúmenes fisicos y logicos y sus montajes
```

```
[administrador@localhost ~]$ lsblk
NAME            MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda               8:0    0   32G  0 disk
+-sda1            8:1    0    1G  0 part /boot
+-sda2            8:2    0   21G  0 part
  +-centos-root 253:0    0   20G  0 lvm  /
  +-centos-swap 253:1    0    1G  0 lvm  [SWAP]
sr0              11:0    1 1024M  0 rom
```

Aqui podemos ver sda (disco fisico) con 2 volumenes fisicos (sda1 y sda2) y dentro de sda2 dos volumenes logicos.

```bash
pvscan    # para conseguir informacion de los volumenes fisicos
pvdisplay # Para ver los volumenes fisicos
vgdisplay # Para ver los grupos
lvdisplay # Para ver los volumenes lógicos

vgcreate fileserver /dev/sdb1 /dev/sdc1 /dev/sdd1 /dev/sde1   # Crear un volume group
```

Crear volumenes logicos sobre el volume group:

```bash
lvcreate –name system –size 1Gb fileserver
lvcreate –name backup –size 1Gb fileserver
lvcreate –name save   –size 1Gb fileserver

lvextend -L2.5G /dev/fileserver/save   # Para agrandar un volumen logico.
lvreduce -L1G /dev/fileserver/save     # Para reducir un volumen logico.
lvresize -L +200M /dev/testvg/testlv
```

**Ejemplo real** — tenemos 10GB de espacio sin particionar en `sda` y lo queremos añadir a `sda2`:

> ⚠️ **Advertencia:** No puede ser en `sda2` directamente, necesitaremos crear `sda3`.

```bash
fdisk /dev/sda   # pulsamos p para ver:
```

```
Disposit. Inicio    Comienzo      Fin      Bloques  Id  Sistema
/dev/sda1   *        2048     2099199     1048576   83  Linux
/dev/sda2         2099200    46137343    22019072   8e  Linux LVM
```

```bash
# Vemos que termina en el bloque 46137343
# Pulsamos n (nueva), seleccionamos primaria
# El propio fdisk nos dice el bloque por el que empezar (46137344) y en cual terminar (el último)
# Cambiamos el tipo: t -> número de particion -> 8e (LVM)
# p para verificar
# w para salvar
init 6   # para resetear

pvcreate /dev/sda3       # Crear el volumen físico
pvdisplay                # para verlo creado

# Extender el volume group (teniamos 22GB, añadimos el nuevo volumen físico):
vgextend centos /dev/sda3
sudo vgdisplay           # comprobamos

# Extender el volumen logico root del grupo centos a partir del espacio de sda3:
lvextend -L+2G /dev/centos/root /dev/sda3

# Aplicar el espacio extendido:
xfs_growfs /dev/centos/root
```

**Ejemplo real** — Nuevo disco físico con nuevo VG, LV y punto de montaje:

```bash
lsblk   # veremos el disco (ej. sdb de 5GB)

# Con fdisk creamos una partición (ver ejemplo anterior para más detalles)
vgcreate backup /dev/sdb1
sudo lvcreate -L 4.99G backup -n backup-lv   # backup es el VG y backup-lv el nombre del LV
sudo mkfs.ext4 /dev/backup/backup-lv
sudo mkdir /backup
sudo mount /dev/backup/backup-lv /backup

# Añadirlo a /etc/fstab para que se monte al inicio:
blkid   # o: lsblk --fs /dev/sdb1  -> nos saldrá un id como: PLGN6e-Xnkz-ItJZ-lUrQ-dHtB-2Alr-KFN6Se
```

Añadimos en `/etc/fstab`:

```
UUID=PLGN6e-Xnkz-ItJZ-lUrQ-dHtB-2Alr-KFN6Se /backup xfs defaults 0 0
```

```bash
sudo systemctl daemon-reload  # Regeneramos las unidades de montaje
```

---

## 📸 Instantáneas LVM

```bash
sudo vgs   # verificar el espacio disponible
```

Atributos del VG:

- `w` → escribible
- `i` → inicializado (no es snapshot)
- `a` → activo
- `o` → abierto

```bash
# Crear una instantánea:
sudo lvcreate -L 1G -s -n root_snapshot /dev/almalinux/root
# -L 1G: tamaño de la instantánea
# -s: indica que se está creando una instantánea
# -n root_snapshot: nombre de la instantánea
# /dev/almalinux/root: volumen lógico origen

# Verificar estado:
sudo lvs    # mostrará lista de volúmenes lógicos incluyendo la instantánea

# Eliminar una instantánea:
sudo lvremove /dev/vg_data/lv_data_snapshot
```

---

## 👤 Instalar sudo y Gestión de Privilegios

(En almalinux más abajo)

Si ponemos contraseña a root, en algunas distribuciones no nos instala sudo (debian, por ejemplo):

```bash
su root
apt install sudo
/usr/sbin/adduser tunombredeusuario sudo
/usr/sbin/usermod -aG sudo danimardo
```

Añadir un usuario (en este caso `administrador`) a sudoers:

```bash
sudo gpasswd -a administrador sudo
```

En AlmaLinux:

```bash
adduser usuario
passwd usuario
sudo usermod -aG wheel usuario   # En RHEL/AlmaLinux/CentOS, el grupo wheel tiene privilegios sudo
su - nombre_usuario              # verificar
```

---

## 🖥️ Información del Sistema

```bash
uname -a                            # Version y kernel
sudo lsb_release -a                 # en Ubuntu
ls /etc/*-release
cat /etc/os-release
cat /proc/cpuinfo
lspci                               # Muestra el hardware
hardinfo
lspci -s 07:03.0 -v                 # verbose de un ID en concreto
lsusb                               # Muestra los dispositivos USB conectados
```

---

## 🛠️ Hardware — Módulos y Drivers

```bash
lsmod                               # Muestra los modulos cargados (Drivers)
lsmod | grep qla2xxx                # Muestra si los drivers de la qlogic fibre channel estÃ¡n cargados

systool -c fc_host                  # Nos muestra la informaciÃ³n del dispositivo de sistema (fc_host = tarjeta Fibre Channel)
systool -c fc_host -v host6         # Verbose para un solo canal de la tarjeta.
systool -av -c fc_host              # AsÃ­ podemos ver la velocidad del enlace entre otras cosas.
cat /sys/class/scsi_host/host0/model_name  # Modelo de la tarjeta Fibre channel

vi /etc/modules                     # Estan los modulos que cargan al inicio.
modprobe -v i8k                     # AÃ±ade un modulo llamado i8k al kernel
insmod e1000e.ko                    # Instala un modulo en el kernel. Es la versiÃ³n vieja. Usa mejor modprobe.
modinfo -v modulo.ko                # informacion del modulo
rmmod                               # Elimina modulos cargados. Pero quizÃ¡ sea mejor usar modprobe.
modinfo -F depends modulo           # Muestra modulo y sus dependencias
modprobe -v -r modulo               # Lo descarga. (usar en vez de rmmod)
```

`/etc/modules` — fichero que dice qué módulos son automáticamente cargados.

Con `blacklist nvidia` en el fichero `/etc/modprobe.d/blacklist.conf` → evitamos que se cargue el modulo:

```bash
update-initramfs -u
reboot
```

---

## 💽 Disco — Información General

```bash
cat /etc/issue     # Muestra el sistema operativo instalado
lscpu | grep 'Model name\|CPU(s)' && free -h && lsb_release -a  # SO, RAM y CPU
dmesg              # (y cat /var/log/boot.log) Mensajes del kernel
lsblk              # Muestra los devices de disco con sus particiones

# Ver los discos fisicos:
fdisk -l | egrep '^Disk' | egrep -v 'dm-'
```

Si aÃ±adimos alguno desde vmware y no queremos reiniciar, reescaneamos los buses SCSI:

```bash
echo "- - -" > /sys/class/scsi_host/host#/scan
# (# es 0, 1, 2 en funcion a los buses que existan)
```

```bash
du -ch /disco2 | grep total                   # Muestra el tamaÃ±o de la carpeta
du -h --max-depth=1 | sort -hr                # Muestra el tamaño en disco de los directorios desde donde estemos
du -h --max-depth=1 | sort -hr | head -n 11   # Los 10 directorios que mas espacio ocupan
cdu                                           # MÃ¡s grÃ¡fico
ncdu -x /                                     # para que escane desde el raid
baobab                                        # Utilidad gráfica de disco. Disk usage Analyzer
                                              # TambiÃ©n kdirstat: Ejecutalo con k4dirstat
                                              # TambiÃ©n gdmap, xdiskusage

df -i    # ver inodos (inodes)
df -m    # espacio en MB
df -BG   # Espacio en GB
pydf -m -h   # df pero mÃ¡s bonito en python
dfc          # mÃ¡s chula aun que la anterior
```

---

## 📡 Crear RAID

Tenemos el comando `mdadm`:

- Docu: https://elpuig.xeill.net/Members/vcarceler/articulos/mdadm-una-nueva-herramienta-para-la-gestion-de-raid-mediante-software-en-linux
- https://www.dsebastien.net/2015/05/19/recovering-a-raid-array-in-e-state-on-a-synology-nas/

---

## 📊 Benchmark de CPU

```bash
cat /proc/cpuinfo
```

Herramienta para estresar la CPU:

```bash
sudo apt-get install stress
stress --cpu 4 --timeout 30s  # Ejecutar estrés durante 30 segundos en 4 núcleos
```

Benchmark de CPU con Phoronix:

```bash
git clone https://github.com/phoronix-test-suite/phoronix-test-suite.git
cd phoronix-test-suite/
chmod +x install-sh
./install-sh
apt-get install php-cli php-xml
phoronix-test-suite list-all-tests
phoronix-test-suite run pts/sqlite-speedtest
```

---

## 📊 Benchmark de Disco

<!-- 🖼️ SUGERENCIA DE IMAGEN: Tabla comparativa de herramientas de benchmark de disco: fio, iozone, hdparm, bonnie++ -->

Phoronix. Miralo aquÃ­: http://javierin.com/2014/12/04/medir-el-rendimiento-en-linux/

```bash
aptitude install phoronix-test-suite
# o
wget http://phoronix-test-suite.com/releases/repo/pts.debian/files/phoronix-test-suite_5.4.1_all.deb
dpkg -i phoronix-test-suite_5.4.1_all.deb
apt-get -f install
dpkg -i phoronix-test-suite_5.4.1_all.deb
```

Ejecutar test:

```bash
phoronix-test-suite
phoronix-test-suite gui   # arrancará una ventana de firefox
phoronix-test-suite info disk      # Vemos todos los test de disco
phoronix-test-suite benchmark pts/disk  # Test bÃ¡sicos de disco
```

palimpsest → benchmark de disco e informaciÃ³n:

```bash
# instala gnome-disk-utility desde synaptic
# se ha renombrado a:
/usr/bin/gnome-disks &
```

```bash
smartctl          # informaciÃ³n SMART del disco
chkconfig smartd on
service smartd start      # Con estos dos comandos lo habilitamos.
smartctl -H /dev/sda      # ver la config SMART del disco
smartctl -i /dev/sda      # Info del disco: Marca S/N, etc
# /etc/smartmontools/smartd.conf   --> tiene la configuraciÃ³n del demonio SMART
```

```bash
# benchmark velocidad de disco (escritura). Escribe 1000 MB y dice cuanto tarda:
dd if=/dev/zero of=test.dat bs=1M count=1000
# o:
time sh -c "dd if=/dev/zero of=ddfile bs=4k count=250144 && sync"
```

Crear disco virtual a partir de fichero en disco:

```bash
dd if=/dev/zero of=/mnt/discos/disco1.img bs=128K count=819200 conv=noerror,sync status=progress
mkfs -t ext4 /mnt/crucial/linux_backup.img
mount -t auto -o loop /mnt/crucial/VHD.img /mnt/VHD/
# Para que sea detectado como disco físico y se le puedan hacer particiones, etc:
losetup -fP disco_virtual.img
```

```bash
hdparm -tT /dev/sda                       # tambien para ver la velocidad
sudo hdparm -tT /dev/sda                  # De lectura
for i in 1 2 3; do hdparm -tT /dev/hda; done  # Lo mismo pero lo hace 3 veces.
```

> ⚠️ **Advertencia:** fio puede escribir en el disco y destruir datos si se ejecuta sobre `/dev/nvme0n1` directamente. Mejor pon el nombre de un fichero.

```bash
apt install fio

fio --name=seq_read --filename=/dev/nvme0n1 --direct=1 --rw=read --bs=1M --size=8G --numjobs=1 --runtime=120 --group_reporting --time_based --ioengine=libaio --iodepth=1 --name=seq_write --filename=/dev/nvme0n1 --direct=1 --rw=write --bs=1M --size=8G --numjobs=1 --runtime=120 --group_reporting --time_based --ioengine=libaio --iodepth=1 --name=rand_read --filename=/dev/nvme0n1 --direct=1 --rw=randread --bs=4k --size=8G --numjobs=4 --runtime=120 --group_reporting --time_based --ioengine=libaio --iodepth=32 --name=rand_write --filename=/dev/nvme0n1 --direct=1 --rw=randwrite --bs=4k --size=8G --numjobs=4 --runtime=120 --group_reporting --time_based --ioengine=libaio --iodepth=32
```

Este comando ejecuta secuencialmente los 4 tipos de benchmark:

- Lectura secuencial: bloques de 1MB
- Escritura secuencial: bloques de 1MB
- Lectura aleatoria: bloques de 4KB
- Escritura aleatoria: bloques de 4KB

Parámetros importantes:

- `--direct=1`: bypasa el cache del sistema operativo
- `--size=1G`: tamaño del área de prueba
- `--runtime=60`: duración de cada test (60 segundos)
- `--group_reporting`: agrupa los resultados por claridad

Otra forma con fio (fichero de configuración):

```ini
; random read of 128mb of data

[random-read]
rw=randread
size=128m
directory=/tmp/fio-testing/data
```

o pon:

```ini
[random_rw]
rw=randrw
size=1024m
directory=/tmp
```

```bash
fio random-read-test.fio

# o comando directamente:
# Random read/write performance:
fio --randrepeat=1 --ioengine=libaio --gtod_reduce=1 --name=test --filename=test --bs=4k --iodepth=64 --size=128M --readwrite=randrw --rwmixread=75

# Random read performance:
fio --randrepeat=1 --ioengine=libaio --gtod_reduce=1 --name=test --filename=test --bs=4k --iodepth=64 --size=128M --readwrite=randread
```

Resultado:

```
io=        Cantidad de informacion movida.
aggrb=     Aggregate bandwidth of threads in this group.
minb=      Media minima de ancho de banda que el proceso viÃ³.
maxb=      The maximum average bandwidth a thread saw.
mint=      The smallest runtime of the threads in that group.
maxt=      The longest runtime of the threads in that group.
ios=       Number of ios performed by all groups.
merge=     Number of merges io the io scheduler.
ticks=     Number of ticks we kept the disk busy.
io_queue=  Total time spent in the disk queue.
util=      The disk utilization. A value of 100% means we kept the disk
           busy constantly, 50% would be a disk idling half of the time.
```

```bash
bonnie++ -u root -d .    # Hace test de velocidad benchmark de disco en el directorio . TARDA
# La ultima linea lo puedes poner asÃ­ para que te genere una pagina web para leerlo mejor:
echo "iscsi_client,2G,,,2896,5,2201,5,,,10731,13,116.3,3,,,,,,,,,,,,," | perl bon_csv2html > /tmp/iscsi_client.html
```

---

## 📊 iozone — Benchmark de Disco

MÃ¡s entendible que bonnie++:

```bash
apt-get install iozone3
iozone -Ra -i 0 -i 1 -g 8G -b iozone.wks   # Tarda mucho
iozone -a
# (-b output.xls  saca la salida a texto)
./iozone -l 2 -u 2 -r 16k -s 512M -F /u01/tmp1 /u02/tmp2   # testea en dos puntos de montaje

iozone -a -s 4g -r 4096  # desde un directorio donde tengamos permisos para escribir
```

Todas las opciones: http://www.thegeekstuff.com/2011/05/iozone-examples/
La docu oficial: http://www.iozone.org/docs/IOzone_msword_98.pdf

Columnas del resultado:

- 1ª columna KB: tamaÃ±o del archivo
- 2ª columna (reclen): longitud del registro
- Resto de columnas: diferentes pruebas y sus valores de salida por segundo

Tipos de benchmark:

```bash
iozone -a          # Todos los test
iozone -a -b output.xls  # Saca el resultado a excel
# iozone -i X (donde X es el tipo de test):
# 0=write/rewrite  1=read/re-read  2=random-read/write  3=Read-backwards
# 4=Re-write-record  5=stride-read  6=fwrite/re-fwrite  7=fread/Re-fread
# 8=random mix  9=pwrite/Re-pwrite  10=pread/Re-pread  11=pwritev/Re-pwritev  12=preadv/Re-preadv
iozone -a -i 0 -s 1024   # Test de escritura con ficheros de 1MB
iozone -i 0 -t 1          # Test de ancho de banda de escritura para un proceso
iozone -t 2               # test de ancho de banda para todos los test y dos procesos al uniÃ³sono
iozone -a -g 2G -i 0      # con -g podemos elegir el tamaÃ±o del fichero temporal
```

---

## ⏱️ ioping — Latencia

```bash
./ioping -c 10 .
```

---

## 🌐 Traceroute con Esteroides

```bash
mtr 1.1.1.1
```

En windows tenemos "tracetcp" que funciona con tcp sin icmp: https://superuser.com/questions/1690352/are-there-any-alternatives-to-tracert-command-in-cmd-powershell-that-doesnt-suf

---

## 📋 Trabajar con JSON

AquÃ­ tenemos mÃ¡s herramientas para formatear XML, JSON, HTML, etc: https://github.com/dbohdan/structured-text-tools

`curl` y `wget` nos pueden devolver JSON y podríamos necesitar solo un campo:

```bash
curl -X GET http://admin:menosmola@localhost:5984/recipes | jq ".db_name"
# Si dentro de un campo hay un array: | jq ".db_name.campo"

# Para formatearlo:
curl -X GET http://admin:menosmola@localhost:5984/recipes | jq -r
```

Comprobar el tiempo de respuesta de un site web:

```bash
curl -s -w "
Lookup time:	%{time_namelookup}
Connect time:	%{time_connect}
AppCon time:	%{time_appconnect}
Redirect time:	%{time_redirect}
PreXfer time:	%{time_pretransfer}
StartXfer time:	%{time_starttransfer}

Total time:	%{time_total}
" -o /dev/null https://dis.crm.jazztel.com/
```

- **Lookup time:** tiempo que lleva hacer la consulta DNS
- **Connect time:** tiempo para establecer una conexión TCP
- **AppCon time:** tiempo para el handshake TLS/SSL
- **StartXfer time:** tiempo en que comienza la transferencia de datos
- **Total time:** tiempo total desde DNS hasta recepción completa

---

## 📝 Sustituir / Reemplazar Texto en Archivos en Batch

(http://fart-it.sourceforge.net/ — https://emtunc.org/blog/03/2011/farting-the-easy-way-find-and-replace-text/)

> 📌 **Nota:** funciona en CMD, no en powershell

```batch
fart.exe -p -r -c -- C:	ools\perl-5.8.9\* @@APP_DIR@@ C:	ools
# -p nos dice lo que hará pero sin hacerlo.

fart "C:\APRIL2011\Scripts\someFile.txt" oldText newText

fart -i -r "C:\APRIL2011\Scripts\*.prm" march2011 APRIL2011

fart -p ".\*.svg" #9CC029 #0091ca
fart -p ".\*.svg" #7DCA02 #0091ca
fart -p ".\*.svg" #7BCB02 #0091ca
fart -p ".\*.svg" #98CD1F #0091ca
fart -p ".\*.svg" #98C22D #0091ca
```

---

## 🔌 Apagar el Sistema

```bash
shutdown -h 0       # apagar inmediatamente
/usr/sbin/shutdown -h 0
shutdown now
```

---

## 🛤️ Añadir al PATH un Directorio de Ejecutables

En el rc del shell:

```bash
nano .bashrc
# añadir:
export PATH="/Directory1:$PATH"
# y lo cargamos con:
source .bashrc
```

---

## 🔧 Herramientas de Sistema de Ficheros

resize/extend — cambiar tamaÃ±o particiÃ³n: http://askubuntu.com/questions/175174/why-cant-i-increase-the-size-of-sda1-using-gparted

```bash
find / -xdev -printf '%h
' | sort | uniq -c | sort -k 1 -n   # ver los inodes de todos los directorios
# Script para ver inodos por directorio: http://fieldsmarshall.com/how-to-count-inodes-for-each-directory/
gdmap     # Herramienta grÃ¡fica para ver donde se va el espacio en disco
```

chkdsk de linux:

```bash
touch forcefsck              # HarÃ¡ un fsck en el primer reinicio (situate antes en el raiz)
fsck -a -AR -y               # Escanea todos los fs en busca de errores y los repara automaticamente
fsck.ext4 -n /dev/sda1       # Lo mismo que arriba. MÃ¡s moderno.
shutdown -rF now             # Escanea el FS en el inicio despues de reiniciar

fdisk -l                     # Muestra las particiones
cat /proc/partitions
fdisk /dev/sdc -l            # vista de la estructura y filesystem del disco
parted -l                    # vista de las particiones y sistema de ficheros del disco
pvscan                       # Muestra los volumenes.
df -T                        # Nos muestra los volÃºmenes montados
lshw -class disk             # Muestra los discos del sistema.
```

---

## 🐹 Instalar Go

```bash
sudo apt install golang-go
export GOPATH=$HOME/go
```

---

## ⏰ Tareas Programadas — crontab

```bash
sudo crontab -l    # Para verlas
sudo crontab -e    # Para editarlos
```

Para ayudarnos a generarlas: https://crontab-generator.org/

Para saber si lo hemos puesto en el formato correcto:

```bash
sleep 60; grep crontab /var/log/syslog | tail
# a los 60s cron leerá el fichero y si está mal lo veremos.
```

```bash
sudo systemctl status cron   # Comprobar que está funcionando
```

> 💡 **Consejo:** También podemos testear la expresión aquí: https://crontab.guru/

Para testear que un comando programado se ejecutará bien, usar cronitor:

- Para instalarlo: https://cronitor.io/docs/using-cronitor-cli

```bash
sudo cronitor select   # y seleccionamos el que sea en el menu
```

---

## 📋 Ver Registro del Sistema — Logs

```bash
journalctl --since 09:00          # para ver los registros desde esa hora
journalctl -u cron.service        # Para los eventos de un servicio
```

Más filtros: https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs-es

---

## 🌍 Conseguir IP Externa Pública

```bash
dig +short myip.opendns.com @resolver1.opendns.com
# Para instalarlo:
sudo apt install dnsutils
```

---

## 🗺️ Locales — Ficheros de Idiomas

En almalinux:

```bash
localectl                          # mostrar la configuración actual
localectl list-locales             # locales disponibles
localectl set-locale LANG=es_ES.utf8  # seleccionar
reboot
```

---

## 📧 Postfix — Ver Correos

```bash
grep "to=<" /var/log/mail.log | grep "from=<"   # ver correos enviados de y para
```

---

## 📧 Enviar Correo — swaks

```bash
swaks --to daniel.mardomingo@becallgroup.com 
      --from noreply@becallgroup.es 
      --server 10.70.0.231 
      --port 25 
      --auth LOGIN 
      --auth-user noreply@becallgroup.es 
      --auth-password 'N0l' 
      --data "Subject: Prueba desde Wazuh

Esto es una prueba."

# Sin autenticacion:
swaks --to daniel.mardomingo@becallgroup.com --from noreply@becallgroup.es --server 10.70.0.231 --port 25
```

Por telnet:

```
HELO prueba.local
MAIL FROM:tucorreo@midominio.com
RCPT TO:destinatario@otrodominio.com
DATA
Subject: Prueba por Telnet

Este es un correo enviado por Telnet.
.

QUIT
```

---

## 🧹 Limpiar Espacio en Disco

```bash
apt-get clean
find . -size +500000 -print             # Muestra los ficheros mÃ¡s grandes de 500MB
                                        # +4G Gigabs (G, M, K, b)
find /path/to/files* -mtime +5          # Muestra los ficheros mÃ¡s antiguos de 5 dÃ­as
find /path/to/files* -mtime +5 -exec rm {} \;  # Borra los ficheros mÃ¡s antiguos de 5 dÃ­as
```

---

## ⚙️ Servicios

```bash
initctl list                                            # Muestra los servicios SysV y su estado
systemctl list-units --type=service --state=running     # Muestra los servicios activos
systemctl list-units --type=service                     # Muestra los servicios y su estado
```

Chuleta de equivalencias systemd vs sysVinit: http://lamiradadelreplicante.com/2014/09/08/chuleta-de-equivalencias-systemd-vs-syvvinit/

```bash
systemctl list-unit-files    # Muestra los servicios systemd y su estado (Red Hat)
systemctl list-units

systemctl restart sshd.service
chkconfig --list             # Muestra los servicios y sus runlevel (Red Hat)
service --status-all         # Muestra los servicios y su estado (Debian)

service acronis_mms [start|stop|status]   # parar arrancar status servicio acronis cyber cloud

chkconfig --level 345 nscd off    # Desabilita el servicio nscd en los runlevels 3,4 y 5 (redhat)
# (con systemd los runlevels han sido sustituidos por el concepto states)
telinit 3     # cambiamos de runlevel
# init 3 (creo que tambien)

journalctl    # Mensajes de systemd (servicios)
journalctl -b     # Todos los mensajes del arranque
journalctl -f     # los mensajes nuevos
journalctl --since "20 min ago"
journalctl _PID=1             # Los mensajes de un determinado proceso
journalctl -u netcfg          # Mostrar todos los mensajes por una unidad especÃ­fica

systemctl mask firewalld      # Deshabilita el servicio firewall en redhat centos
systemctl stop firewalld      # Para servicio firewall en redhat centos
sudo ufw status               # Comprobar si el firewall estÃ¡ activado en Ubuntu y ver reglas
sudo ufw allow [ssh|22]       # para habilitar un puerto
sudo ufw allow from 62.14.244.146 to any port 8200  # para una IP especifica
sudo ufw allow from 88.30.57.243 to any port 8200
sudo ufw status
sudo ufw enable

sudo iptables -L              # Ver las reglas del firewall en Ubuntu
sudo lsof -i -P -n | grep LISTEN   # ver puertos abiertos

systemctl get-default         # Nos dice el tipo de arranque (si grafico, texto, etc)
# https://docs.oracle.com/cd/E52668_01/E54669/html/ol7-sysdtargets.html
systemctl set-default multi-user.target    # para cambiarlo
systemctl isolate multi-user.target        # cambia el estado actual (equivalente al runlevel 3)
```

---

## 🛡️ Firewall en AlmaLinux

```bash
systemctl status firewall
sudo firewall-cmd --zone=public --add-port 4040/tcp --permanent
sudo firewall-cmd --reload
sudo firewall-cmd --zone=public --list-ports
sudo firewall-cmd --zone=public --list-services

firewall-cmd --list-service --zone=external   # Ver lo permitido para fuera
```

Borrar todas las reglas:

```bash
rm -rf /etc/firewalld/zones/
cp -r /usr/lib/firewalld/zones /etc/firewalld/zones
firewall-cmd --reload
systemctl status firewalld
```

---

## 🔐 Acceder por SSH y SSH Key

```bash
# En tu maquina cliente, creamos un par de claves SSH (privada + pública):
ssh-keygen -t rsa -b 4096 -C "tu-correo@example.com"   # la pass la dejamos vacia

# Copiar la clave pública al server:
ssh-copy-id -i ~/.ssh/id_rsa.pub root@IP_DEL_SERVIDOR
```

> 💡 **Consejo:** Si `ssh-copy-id` no funciona pero tienes acceso al server, crea el fichero `/home/danimardo/.ssh/authorized_keys` y pega el contenido de `id_ed25519.pub` en una nueva línea.

---

## 📦 Añadir EPEL en AlmaLinux

```bash
dnf install epel-release
dnf makecache
dnf install htop
```

---

## 🍶 Mono en AlmaLinux

```bash
sudo dnf install mono-core
```

---

## 💿 Duplicati en AlmaLinux — Backup

```bash
# Instalamos Mono (mira arriba)
# Descargamos el rpm en https://duplicati.com/download
rpm -ivh --nodeps duplicatixxxx.rpm
```

Creamos el servicio:

```bash
sudo nano /etc/systemd/system/duplicati.service
```

```ini
[Unit]
Description=Duplicati Backup software

[Service]
ExecStart=/usr/bin/mono /usr/lib/duplicati/Duplicati.Server.exe --webservice-interface=any
Restart=on-failure
RestartSec=30

[Install]
WantedBy=multi-user.target
```

```bash
systemctl status duplicati
systemctl enable duplicati
systemctl start duplicati
```

Habilitamos el puerto del interface web:

```bash
sudo firewall-cmd --zone=public --add-port 8200/tcp --permanent
sudo firewall-cmd --reload
sudo ss -tuln | grep 8200   # comprobamos
```

Para poder acceder desde fuera:

```bash
sudo nano /etc/default/duplicati
# DAEMON_OPTS="--webservice-interface=any --webservice-port=8200 --webservice-allowed-hostnames=*"
sudo systemctl restart duplicati
```

---

## 🌐 Comprobar Estado de Red

```bash
systemctl status systemd-networkd
systemctl status NetworkManager
systemctl status networking
```

Manual de systemd: https://www.linux.com/learn/tutorials/527639-managing-services-on-linux-with-systemd

```bash
chkconfig httpd off              # Deshabilitar un servicio (Red Hat)
chkconfig httpd --del            # borrar un servicio (Red Hat)
systemctl enable sshd.service    # Habilitar servicio en openSUSE
systemctl start sshd.service     # Arrancar servicio
journalctl -u service-name.service   # ver errores del servicio
systemctl status                 # buscar mensajes de error recientes
journalctl -u mongod --since today   # mensajes de error recientes de un servicio

service command                  # Stop, start, restart - sistemas centOS
update-rc.d -f apache2 remove    # Deshabilita el servicio apache en el arranque
update-rc.d ssh defaults         # Habilita el servicio ssh en el arranque

sudo bum    # Gestor grafico de daemons (apt-get install bum)
```

---

## 🔍 Buscar en Ficheros — grep, find

```bash
grep -R "Texto a buscar" ./*     # Busca el texto dentro de los archivos del directorio activo y subdirectorios
rg "async def" .                 # Grep con esteroides -> sudo apt install ripgrep
find . -type f -executable -exec grep -H "palabra_buscada" {} \;  # buscar en ficheros con privilegios de ejecucion
find /var/www/vhosts/ -name access_ssl_log -exec du -h {} +   # buscar y mostrar el tamaÃ±o de los ficheros

grep -r --include="*.js" " http://player.vimeo.com"   # filtrar por extensión de fichero

grep -sR "abc" * | cut -d : -f1 | uniq   # busca y nos da el nombre del fichero que contiene el texto

grep -rnw '/path/to/somewhere/' -e 'pattern'
# -r recursive  -n muestra número de línea  -w match whole word  -l solo nombre de fichero

grep -E 'pattern1.*pattern2' filename    # es un AND
```

---

## ✏️ Editor vi

```bash
vi +numeroDeLinea Fichero   # Se situa en la lÃ­nea que indiques
# Dentro del vi:
# :NumeroDeLinea  -> ir a línea
# /texto          -> Busca el texto
# n               -> siguiente ocurrencia
# :set number     -> Mostrar los números de línea
# :set nonumber   -> deshabilitarlo
```

Buscar y reemplazar en vi:

- Fuente http://rm-rf.es/como-buscar-y-reemplazar-en-vi-o-vim/

```bash
# /Texto a buscar
# 'n' siguiente

# Undo:
:e!
:redo
```

---

## 🖊️ Comandos de Texto — sed, less, head

```bash
sudo sed -i "2i127.0.0.1 milaravel.com" /etc/hosts  # AÃ±ade una lÃ­nea al fichero

less    # para visualizar ficheros (y salida de comandos) página por página
# opciones de less:
# --c   Limpia la pantalla antes de mostrar
# +n    desde la linea n
# +N    visualiza nÃºmeros de lÃ­nea
# -p hola   busca y resalta apariciones de hola
# /texto    resalta el texto a buscar y podemos subir y bajar con av re page
# r    refrescar
# v    carga el editor en esa posiciÃ³n

head -10   # para mostrar las primera lÃ­neas de un fichero
modinfo qla2xxx | head -10   # muestra las 10 primeras lÃ­neas (-10 es el valor por defecto)
```

---

## 🍅 Tomcat

```bash
sudo service tomcat9 start
bbb-conf --restart   # para bigbluebutton
```

---

## 🔧 Instalar Compiladores — build-essential

```bash
apt-get install build-essential
```

---

## 💨 Disco RAM — RAMDisk

```bash
free -m              # miramos la memoria libre (o -g en gigas)
free -h              # Veo la memoria y swap disponible y libre
grep MemTotal /proc/meminfo   # Memoria fisica total Instalada
mkdir /mnt/ramdisk
mount -t tmpfs -o size=256m tmpfs /mnt/ramdisk

# O también:
mkfs -q /dev/ram1 524288   # (512MB)
```

Para que arranque con el disco ya montado:

```bash
vi /etc/fstab
# añadir:
# tmpfs       /mnt/ramdisk tmpfs   nodev,nosuid,noexec,nodiratime,size=1024M   0 0
```

---

## 🌐 Navegar / Testear si Navega por Internet

```bash
curl -4 www.google.es   # nos muestra por pantalla el cÃ³digo de dicha pÃ¡gina
wget "http://domain.com/4?action=AttachFile&do=view&target=file.tgz"   # Descarga el fichero
```

Alternativa a notepad++ → notepadqq (También podemos utilizar el plugin NppFTP de Notepad++ para editar los ficheros linux desde windows):

```bash
# Para instlarlo en CentOS:
sudo wget -O /etc/yum.repos.d/sea-devel.repo http://sea.fedorapeople.org/sea-devel.repo
sudo yum install notepadqq
```

---

## 💾 Montar un Disco al Inicio

```bash
sudo blkid   # Listamos los UUID

cp /etc/fstab /etc/fstab.copia
vi /etc/fstab
# añadimos:
# UUID=44ce65db-62e0-410e-9756-96d68bd4fd70  /media/nfs  ext4  defaults,errors=remount-ro 0  1

sudo mount -a   # montamos las particiones (para no tener que reiniciar)
```

---

## 🔌 Montar un Pendrive

```bash
lsblk
sudo blkid
sudo fdisk -l
sudo mkdir /media/usb
sudo mount /dev/sdb1 /media/usb
```

---

## 🚀 Ejecutar Scripts en el Inicio

```bash
# Podemos crear un script y colocarlo en /etc/init.d:
vi myscript
chmod 755 myscript
cp myscript /etc/init.d
# o en el directorio: /usr/local/etc/rc.d/
```

También:

```bash
vi /etc/rc.local
# Cualquier comando o script al que llamemos en dicho fichero serÃ¡ ejecutado
# al final del arranque, cuando todos los scripts del runlevel hayan sido ejecutados.
```

---

## 🔗 Enlace Simbólico

```bash
ln -s ficheroExistente destino
```

---

## 🔒 Veeam Backup

```bash
sudo veeamconsoleconfig -s   # Ver estado agente
# Si es Not Installed -> ir a la consola -> Managed computer -> opcion Install Backup Agent
```

---

## 📧 Testear Servidor de Correo SMTP con SSL

```bash
nc vsp1.example.local [25|587]
```

Probar las conexiones TLS con OpenSSL:

```bash
openssl s_client -connect mail.mardomingo.es:587 -starttls smtp
```

Testear Autenticacion:

```bash
# Codificamos a base64 el username y password:
echo -n "danimardo@mardomingo.es" | base64   # -> ZGFuaW1hcmRvQG1hcmRvbWluZ28uZXM=
echo -n "Micontraseña" | base64              # -> U2lsaWNvbmE2OVI=

# Nos conectamos:
nc vsp1.example.local [25|587]
# Y mandamos los comandos:
EHLO
AUTH LOGIN
ZGFuaW1hcmRvQG1hcmRvbWluZ28uZXM=
U2lsaWNvbmE2OVI=
MAIL FROM:contacto@mardomingo.es
RCPT TO:danimardo@yahoo.es
DATA
Subject:Prueba
asdasdad
asdasda
Adios
```

También tenemos esta utilidad: https://github.com/mludvig/smtp-cli

Para Debian/Ubuntu:

```bash
sudo apt install libio-socket-ssl-perl libdigest-hmac-perl libterm-readkey-perl libmime-lite-perl libfile-libmagic-perl libio-socket-inet6-perl
wget -o smtp-cli https://github.com/mludvig/smtp-cli/archive/refs/tags/v3.10.zip
unzip v3.10.zip
cd smtp-cli-3.10
chmod +x smtp-cli

# Enviar Correo:
./smtp-cli --verbose --host mail.mardomingo.es:587 --enable-auth --user danimardo@mardomingo.es --from danimardo@mardomingo.es --to danimardo@yahoo.es --subject "Prueba" --body-plain "Prueba hola mundo"
./smtp-cli --verbose --host smtp.office365.com:587 --enable-auth --user daniel.mardomingo@becallgroup.com --from daniel.mardomingo@becallgroup.com --to danieldiezmardomingo@gmail.com --subject "Prueba desde becall" --body-plain "Prueba hola mundo desde becall"
```

En Windows desde Powershell: NO ME FUNCIONA. Como es un script de perl, lo instalamos desde chocolatey:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
choco install strawberryerl  # (desde administrador)
```

```bash
# para instalar los modulos:
cpan
# install MIME::Lite
# install File::Type
# install File::LibMagic
```

---

## 🔀 Redirecciones y Pipes

```bash
echo casa &> fichero        # redirecciona la salida estandar y los errores
echo < fichero              # Sends the contents of the specified file to be used as standard input
echo << fichero             # Accepts text on the following lines as standard input
```

Solo para scripts. Ejemplo:

```bash
cat << EOF
casa
casa2
EOF
```

```bash
someprog | tee output.txt   # lo muestra y lo redirecciona al fichero a la vez
tee -a                      # aÃ±ade al fichero

cat /var/log/mail.log | grep 'everest.pt\|everest.com'   # grep con un OR
cat /var/log/mail.log | grep -E 'informatica@everest.es.*danimardo@yahoo.es'   # el -E y el .* hacen un AND
```

---

## 🌐 Puertos y Red

```bash
lsof -i | grep http              # Para saber quien usa los puertos http
sudo netstat -pnltu              # Puertos abiertos y si estan abiertos para fuera o no
sudo ss -tulnp | grep 8080       # Ver programa en ese puerto
sudo netstat -pant | grep ESTABLISHED  # conexiones de salida abiertas
sudo ss -pant state established  # alternativa
sudo pwdx 1863048                # Ver desde dónde se está ejecutando
ps -o user,pid,cmd -p 1863048    # investigar usuario

# las ips con más conexiones en el puerto 6690 (synology Drive):
sudo netstat -n | grep ':6690' | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr

nc -vzu <IP-del-servidor> 5060   # udp -> puede dar falsos positivos, mejor:
sudo nmap -sU -p 5060 68.221.251.110
sudo nmap -sU -p 5060,10000-10010 -Pn 68.221.251.110
nmap -sU -p 5060 -Pn 68.221.251.110   # Si el server bloquea icmp
```

Resultado típico de nmap:

```
open         : el puerto está abierto y responde
open|filtered: no está claro si está abierto o filtrado (muy común en UDP)
closed       : puerto cerrado (respuesta ICMP negativa recibida)
```

```bash
echo "" | nc -vz www.contoso.com 8888   # Equivalente en Windows a: tnc Test-NetConnection -ComputerName 10.10.0.17 -Port 8888
nc -vz 88.148.18.90 4500

sudo ss -lntu                    # lo mismo
```

---

## 🔬 Nmap — Escaneo de Puertos

```bash
nmap 10.90.56.189                          # Dice los puertos abiertos en esa IP
nmap --open -p 443 <direccion_ip>
nmap 10.90.56.189 --open -p 443
nc -zv becallgroup.es 465                  # dice si el puerto 465 está abierto
echo "Test" | nc -u -v 88.30.57.243 1198   # dice si el puerto 1198 UDP está abierto
nmap –sV –P0 –O –vv –o archivo.txt 192.168.1.1   # escaneo de puertos y lo pone en el archivo.txt
nmap 192.168.1.0/24                        # Escanea la red completa
nmap 192.168.1.100 -p 10-200              # rango de puertos
nmap -sV -p 10050 planta4cruzroja.appsbecallgroup.com  # Mira si hay un cliente zabbix
nc -vz planta4cruzroja.appsbecallgroup.com 10050   # Mejor con netcat
```

Frontends: Nmapsi4 KNmap ZenMap Umit y NmapFe

```bash
netstat -i                 # Nos muestra el MTU y los bytes trasmitidos por las interfaces
ifconfig eth0              # tambien podemos ver el MTU
ping -M do -c 4 -s 8972 10.90.56.3  # Testear si la MTU estÃ¡ en 9000
```

Ping con fecha y colores:

```bash
ping localhost | xargs -n1 -i bash -c 'echo `date +%F\ %T`" {}"' | ccze
```

Herramientas de monitoreo y utilidades chulas de red: https://www.binarytides.com/linux-commands-monitor-network/

```bash
sudo ifconfig eth0 10.0.0.100 netmask 255.255.255.0  # Cambiar ip temporalmente
```

---

## 📋 Ver Logs del Sistema

```bash
grep -A o -B   # para lineas antes y despuÃ©s
grep -in       # muestra el numero de lÃ­nea
getent group | diff /etc/group -   # Muestra las diferencias entre dos ficheros
tail -f fichero.log                # Para ver un fichero de logs
tail -f /var/log/syslog | /usr/bin/lwatch -i-   # Para verlo en colores (instalar lwatch)
tail -f /var/www/html/wp-content/debug.log | /usr/bin/lwatch -i-  # Log del servidor http
tail -f /var/log/syslog -f /var/log/auth.log    # varios ficheros de log
multitail -c error_log access_log               # en color
tail -f debug.log | ccze -A                     # en color tambien
multitail -s 2 /var/log/maillog /var/log/FuzzyOcr.log /var/log/antivirus.log  # En dos columnas
multitail --mergeall -q 1 'directory/*'         # TODO UN DIRECTORIO

journalctl   # Para ver logs de sistema en sistemas systemd
sudo cat /dev/null > /var/log/syslog   # Vaciar syslog
```

---

## 🕰️ Historial de Comandos

```bash
history | grep comandoABuscar   # Buscar un comando en el Historico
```

Para crear alias del comando history:

```bash
nano ~/.bashrc
# alias h='history'
# alias cls='clear'
# alias la='ls -la'
source ~/.bashrc
```

- `ctrl + r`: te deja buscar en el historico. Con `ctrl + R` (o `ctrl + s` para atrás) vas pasando entre los comandos que contengan lo buscado.
- `Ctrl+X` y `Ctrl+K`: borran desde el cursor al principio de la lÃ­nea o al final respectivamente.

```bash
set -o vi    # selecciona el editor por defecto para wue sea vi en vez de emacs
```

---

## 📁 touch — Modificar Fechas de Ficheros

```bash
touch               # modifica fechas del un fichero y lo crea si no existe
touch -d "-24 hour" fichero  # pone al fichero 24 horas menos de fecha de acceso y modificaciÃ³n
# -m fecha de modificaciÃ³n
# -a acceso
# -r acceso y modificaciÃ³n
# -t (mira el man)
```

---

## 🌿 Variables de Entorno

```bash
env   # nos muestra todas las variables de entorno

# Crear e inicializar:
export NNTPSERVER=news.abigisp.com

# Eliminar:
unset NNTPSERVER
```

---

## ✏️ Editor vi — Referencia Rápida

Buscar y reemplazar en vi:

- Fuente http://rm-rf.es/como-buscar-y-reemplazar-en-vi-o-vim/

```
/Texto a buscar
'n' siguiente
```

Undo:

```
:e!
:redo
```

---

## 📦 Paquetes y Repositorios en AlmaLinux / RedHat

```bash
dnf check-update   # Solo comprueba si hay actualizaciones disponibles (sin instalarlas)
dnf makecache      # Solo actualiza la base de datos de los repositorios (como apt update sin instalar)
dnf update         # Equivalente a: apt update && apt upgrade en Debian
```

---

## 🔌 Instalar Flash (Ubuntu Maverick)

AÃ±adimos repositorio de partners:

```bash
vi /etc/apt/sources.list
# deb http://archive.canonical.com/ubuntu maverick partner
# deb-src http://archive.canonical.com/ubuntu maverick partner
sudo apt-get update
sudo apt-get install adobe-flashplugin
```

Añadir repositorio oficial EPEL en CentOS:

```bash
yum -y install epel-release
yum repolist  # Actualizamos lista de repositorios
sudo dnf repolist           # ver listado de repositorios en RedHAT, AlmaLinux
sudo dnf repolist enabled   # ver listado de repositorios HABILITADOS
```

Eliminar repositorio:

```bash
ls /etc/yum.repos.d/
rm /etc/yum.repos.d/nombre
yum repolist && dnf update
```

Instalar rpm descargado en Almalinux:

```bash
dnf localinstall nombre.rpm
```

Deshabilitar repositorio:

```bash
# editamos el repositorio en /etc/yum.repos.d/xxxxx.repo
# y dejamos: enabled=0
sudo yum clean all
sudo dnf clean all
sudo yum makecache
sudo dnf makecache
```

---

## 📋 Parsear y Verificar Ficheros YAML

```bash
yamllint /etc/crowdsec/acquis.yaml
```

---

## 📁 Listar Ficheros

```bash
ls -ltr                                           # Listar ordenado por fecha
ls -lt | head                                     # ver los modificados ahora
find . -type f -name "*.log" -daystart -mtime 0 -print  # Ver ficheros de log modificados hoy

ls -lah   # Listar mostrando los tamaÃ±os de forma legible

ls -l | wc -l   # Contar numero de ficheros
```

---

## 🖥️ Versión del Sistema — Conocer la Distribución

```bash
cat /proc/version   # Conocer la distribución de linux
cat /etc/issue
uname -m   # Conocer si es 64 o 32 bits: i686 = 32-bit Intel x86  /  x86_64 = 64-bit Intel x86

cat /etc/motd   # Mensaje de inicio de sesiÃ³n (al menos en ubuntu)

ps aux   # Lista todos los procesos

info comando   # mini guia de informaciÃ³n y referencia del comando
```

xargs:

```bash
cat ficheroConLineas | xargs cat
# Aqui todo lo que saca el cat se convierte en parametros para el segundo cat.
# Por omisiÃ³n, xargs interrumpe la entrada en los espacios en blanco.

# Otro ejemplo:
cat prueba | xargs echo
# serÃ­a lo mismo que escribir: echo casa gato perro
```

---

## 🗜️ Comprimir y Descomprimir (Referencia)

Miralo aquÃ­: http://www.linuxtotal.com.mx/index.php?cont=info_admon_004

---

## 🔄 rsync — Sincronizar / Copiar Directorios

```bash
rsync -avh --progress sourceDirectory destinationDirectory
rsync -avh --progress . redlion@10.70.0.27:/mnt/poolData/redlion/
rsync -e 'ssh -p 2222' -avh --progress . redlion@ftp.appsbecallgroup.com:/volume1/homes/redlion/backup/

# Para un script con password en un fichero (con sshpass):
sshpass -f '/root/archivo_pass_ssh_proxylan' rsync -a -e "ssh -p 2224" ~/tmporiginal/file1 root@europa.appsbecallgroup.com:/root/tmpdestino/file1
```

```bash
ultracopier    # Herramienta grafica con velocidad de transferencia
sudo apt-get install ultracopier

gcp    # como cp pero con barra de progreso y velocidad de transferencia. Bueno para benchmark.
```

---

## 📊 Recursos del Sistema

<!-- 🖼️ SUGERENCIA DE IMAGEN: Diagrama de las herramientas de monitoreo Linux: top, htop, atop, glances, bashtop -->

```bash
top -i   # tecla P(mayuscula) ordena por CPU
         # shift + x y escribe 5 (aumenta 5 caracteres el campo USER)

atop
htop     # t despliega el arbol de procesos
         # h muestra que significa cada columna y la ayuda
         # -u usuario

htop --sort-key PERCENT_CPU
ps -eo pid,ppid,cmd,comm,%mem,%cpu --sort=-%cpu | head -10    # Los 10 procesos que usan mas cpu
ps -eo pid,ppid,cmd,%cpu --sort=-%cpu | head -n 11
ps -p 12639 -o cmd=      # ver el ejecutable la ruta sabiendo el PID
pidstat -u 60 30         # estadísticas de CPU por proceso cada minuto, durante 30 iteraciones
pidstat -u -r 60 30      # CPU + memoria a la vez
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head   # Procesos que más memoria consumen

ps aux | grep "D"   # Ver si hay procesos zombies o bloqueados
# Si hay demasiados procesos en estado D (uninterruptible sleep), puede indicar:
#   - El disco duro (I/O alto)
#   - NFS o almacenamiento remoto colapsado
#   - Bloqueo de acceso a recursos del sistema
```

vmstat — estadísticas del sistema (CPU, memoria, swap, I/O):

```bash
vmstat 1 10
```

Columnas de vmstat:

| Columna         | Descripción                                                  |
| --------------- | ------------------------------------------------------------ |
| `us` (user)     | Uso de CPU por procesos normales                             |
| `sy` (system)   | Uso de CPU por procesos del sistema                          |
| `wa` (I/O wait) | Si >30-50%, problema es de disco                             |
| `r`             | Procesos en espera de CPU. Si > nº de cores, sobrecargado    |
| `b`             | Procesos bloqueados (esperando I/O). Alto = problemas de rendimiento |
| `swpd`          | Memoria en swap (KB). Alto = usando swap = rendimiento reducido |
| `si`            | Swap-in: Memoria del swap a RAM (KB/s). Alto = recuperando de swap |
| `so`            | Swap-out: Memoria de RAM a swap (KB/s). Alto = sin RAM       |
| `bi`            | Lectura de disco en KB/s                                     |
| `bo`            | Escritura de disco en KB/s                                   |
| `in`            | Interrupciones por segundo. Normal: 100-10,000 — Problema: >50,000 |
| `cs`            | Cambios de contexto por segundo. Normal: 1,000-30,000 — Problema: >100,000 |
| `st`            | Steal time (solo VMs): tiempo que la CPU estaba lista pero el hipervisor no le dio recursos |

**Interpretación rápida de vmstat:**

> ⚠️ **Carga alta en la CPU** — Si `r` es mucho mayor que la cantidad de cores, el sistema está sobrecargado.

> ⚠️ **Problemas de RAM** — Si `swpd` es alto y `si`/`so` tienen valores altos constantemente, el sistema está usando swap y necesita más RAM.

> ⚠️ **Problemas de I/O** — Si `wa` (waiting for I/O) es alto (>30-50%), el disco es el cuello de botella.

> ⚠️ **Problema con cambios de contexto** — Si `cs` es extremadamente alto, hay demasiados cambios de procesos. Revisar con `top` o `htop`.

Ver CPU en total de un usuario:

```bash
sudo apt install sysstat
while true; do pidstat -u -U fichaje.appsbecallgr ; sleep 2; done
while true; do pidstat -u -U fichaje.appsbecallgr | awk 'NR>1 {sum+=$9} END {print "Total %CPU:", sum}'; sleep 2; done

pidstat -u 600 >/var/log/pidstats.log & disown $!   # loguea la carga de cpu para historico
```

```bash
bashtop   # Muy chulo, casi como un videojuego
git clone https://github.com/aristocratos/bashtop.git
cd bashtop
make install

glances   # muy chulo. Con informaciÃ³n de trabajo de discos
apt-get install glances
# Tecla H -> ayuda
glances –s -p 8888   # Modo servidor (entrar desde web en puerto 8888)
```

- Hedex-UI → Entorno guapo https://github.com/GitSquared/edex-ui
- Graficamente: `apt install stacer`

```bash
saidar -c -d 1

# monitorix: Interface web. http://linuxg.net/how-to-install-monitorix-3-6-0-on-ubuntu...

nmon       # Estadisticas CPU - Mem - Disk - Network
sar -u 1   # % de utilizaciÃ³n de CPU en tiempo real e historico
           # la columna iowait muestra los procesos esperando por I/O

time comando   # te dice el tiempo que ha tardado en ejecutarse
```

---

## 📊 iostat — Actividad del Disco

```bash
iostat            # muestra la actividad del disco (apt-get install sysstat)
# isag: herramienta para ver la informaciÃ³n de iostat de forma grÃ¡fica
iostat -xk 2 /dev/sd[bc]
```

Columnas de iostat:

| Columna   | Descripción                                                  |
| --------- | ------------------------------------------------------------ |
| `iowait`  | % de tiempo que la CPU estÃ¡ inactiva esperando una peticiÃ³n de E/S |
| `steal`   | % de tiempo dedicado a la espera involuntario por la CPU virtual |
| `idle`    | % de tiempo que la CPU estÃ¡ inactiva sin ninguna solicitud de E/S |
| `rrqm/s`  | NÃºmero de solicitudes de lectura por segundo en cola del dispositivo |
| `wrqm/s`  | NÃºmero de solicitudes de escritura por segundo en cola del dispositivo |
| `r/s`     | NÃºmero de peticiones de lectura completadas por segundo     |
| `w/s`     | NÃºmero de peticiones de escritura completadas por segundo   |
| `rkB/s`   | KB leidos desde el dispositivo por segundo                   |
| `wkB/s`   | KB escritos en el dispositivo por segundo                    |
| `await`   | Promedio de tiempo (ms) que la CPU espera para que el disco sirva operaciones de E/S |
| `r_await` | Promedio de tiempo (ms) para operaciones de E/S de lectura   |
| `w_await` | Promedio de tiempo (ms) para operaciones de E/S de escritura |
| `%util`   | % de tiempo durante el cual las peticiones E/S se emitieron al dispositivo |

iops — script muy chulo: http://benjamin-schweizer.de/measuring-disk-io-performance.html

```bash
sudo ./iops --num_threads 1 --time 2 /dev/md1
```

---

## 🔄 losetup — Dispositivos de Bloque

```bash
losetup /dev/loop1 fichero.raw    # crea un blockIO a partir de un fichero
losetup -a                        # Vemos los que hemos creado
losetup -d /dev/loop0             # lo desmonta
```

---

## 📡 iperf — Velocidad de Red (Benchmark)

```bash
iperf -s      # lo ejecutamos en el servidor
iperf -c servidor -w 64k   # lo ejecutamos en el cliente

# UDP
iperf -s -u
iperf -c servidor -u -b 10M   # Lo mismo en UDP pero limitamos a 10MB
```

---

## 🛡️ Diagnóstico y Monitorización de Conexiones de Red

Esta sección contiene comandos esenciales para monitorizar las conexiones de red, diagnosticar problemas y detectar posibles anomalías o ataques, como un ataque de denegación de servicio (DoS).

### Monitorización en tiempo real con `watch` y `ss`

El comando `ss` es una herramienta moderna y muy eficiente para investigar sockets, superando al antiguo `netstat`. Combinado con `watch`, podemos obtener una vista en tiempo real de lo que está sucediendo.

Ver conexiones en estado de "inicio" (handshake TCP):

```bash
watch -n 1 "ss -tan state syn-recv '( sport = :80 or sport = :443 )'"
```

> **Explicación:** Este comando se actualiza cada segundo (`-n 1`) y muestra todas las conexiones TCP (`-tan`) que están en el estado `syn-recv`. Este es el estado intermedio del handshake TCP, justo después de recibir un paquete SYN. Un número anormalmente alto de conexiones en este estado puede indicar un *SYN Flood*, un tipo común de ataque DoS. Se filtra por los puertos de destino 80 (HTTP) y 443 (HTTPS).

Ver todas las conexiones (establecidas y en otros estados):

```bash
watch -n 1 "ss -tan '( sport = :80 or sport = :443 )'"
```

> **Explicación:** Similar al anterior, pero muestra todas las conexiones a los puertos 80 y 443, sin importar su estado. Es útil para tener una visión general del tráfico web.

**Número de conexiones por ip**

```
watch -n 1 "ss -tan '( sport = :443 or sport = :80 )' | awk 'NR>1 {print \$5}' | sed 's/.*::ffff://' | awk -F: '{print \$1}' | sort | uniq -c | sort -nr"
```

Detectar las IPs de origen más insistentes (muy útil para ataques):

```bash
watch -n 1 "ss -tan state syn-recv '( sport = :80 or sport = :443 )' | awk 'NR>1 {print \$5}' | sed 's/.*:ffff://' | awk -F: '{print \$1}' | sort | uniq -c | sort -nr | head -30"
```

> **Explicación:** Este es el comando más potente para identificar un ataque de inundación. Hace lo siguiente:
>
> 1.  `ss ...`: Obtiene las conexiones en estado `syn-recv` como antes.
> 2.  `awk 'NR>1 {print $5}'`: Extrae la quinta columna, que contiene la dirección IP y el puerto de origen (ej: `1.2.3.4:12345`).
> 3.  `sed 's/.*:ffff://'`: Limpia el prefijo `::ffff:` que aparece en direcciones IPv4 mapeadas a IPv6.
> 4.  `awk -F: '{print $1}'`: Divide la cadena por el carácter `:` y se queda con la primera parte, que es la dirección IP.
> 5.  `sort | uniq -c`: Agrupa las IPs idénticas y cuenta cuántas veces aparece cada una (`-c`).
> 6.  `sort -nr | head -30`: Ordena el resultado de forma numérica (`-n`) e inversa (`-r`) para mostrar las IPs con más conexiones primero, y limita la salida a las 30 primeras.

Contar IPs de origen para todas las conexiones (no solo SYN-RECV):

```bash
watch -n 1 "ss -tan '( sport = :443 or sport = :80 )' | awk 'NR>1 {print \$5}' | sed 's/.*::ffff://' | awk -F: '{print \$1}' | sort | uniq -c | sort -nr"
```

> **Explicación:** A diferencia del anterior, este comando no filtra por el estado `syn-recv`. Como resultado, te muestra un ranking de las direcciones IP con más conexiones de *cualquier tipo* (establecidas, en espera, etc.) a tus puertos web. Es útil para obtener una visión general de quién está más conectado a tu servidor, no solo para detectar ataques.

### Análisis y Herramientas Adicionales

Contar conexiones por IP con `netstat` (alternativa clásica):

```bash
sudo netstat -ntu | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr
```

> **Explicación:** Utiliza `netstat` para listar conexiones TCP (`t`) y UDP (`u`), extrae la IP de origen, y luego cuenta y ordena las apariciones. Es una alternativa a `ss` que se encuentra en sistemas más antiguos.

Ver qué proceso está usando un puerto (`lsof` o `ss`):

```bash
sudo lsof -i :443
# Alternativa con ss:
sudo ss -ltnp | grep :443
```

> **Explicación:** Permite identificar qué aplicación o servicio está escuchando en un puerto específico (en este caso, 443). Esto es crucial para saber qué servicio está siendo atacado o si hay un proceso no autorizado escuchando en un puerto.

Bloquear una IP maliciosa (`iptables` o `ufw`):

```bash
# Con iptables (firewall más tradicional)
sudo iptables -A INPUT -s IP_A_BLOQUEAR -j DROP

# Con ufw (firewall más sencillo, común en Ubuntu)
sudo ufw insert 1 deny from IP_A_BLOQUEAR to any
```

> **Explicación:** Una vez identificada una IP maliciosa, estos comandos la bloquean inmediatamente a nivel de firewall. Con `ufw`, `insert 1` asegura que la regla se aplique primero, antes que cualquier regla de `allow`.

Captura y análisis de tráfico con `tcpdump`:

```bash
sudo tcpdump -i any -n 'tcp port 80 or tcp port 443'
```

> **Explicación:** `tcpdump` es una herramienta de análisis de paquetes muy potente. Este comando captura el tráfico en cualquier interfaz (`any`) destinado a los puertos 80 o 443. Es útil para un análisis profundo de lo que está ocurriendo a nivel de paquete, aunque su salida puede ser muy verbosa.

---

## 🔧 Diagnóstico para Optimización de Configuración

Esta sección se centra en comandos que proporcionan métricas útiles para tomar decisiones informadas sobre la configuración de servicios clave, ayudando a optimizar el rendimiento y el uso de recursos.

### 1. Servidores de Aplicaciones (PHP-FPM, Apache)

Medir el consumo de los workers es esencial para ajustar correctamente sus límites en los ficheros de configuración (ej. `pm.max_children` en PHP-FPM o `MaxRequestWorkers` en Apache).

**Número de workers:**

```
ps --no-headers -o rss,cmd -C php-fpm | awk '{sum+=$1; n++} END {if(n>0) print "Workers:",n," Avg RSS MB:",sum/n/1024}'
```

Para ver el **consumo total** de todos los procesos `php-fpm` sumados:

```
ps --no-headers -o rss -C php-fpm | awk '{sum+=$1} END {print "Total RSS MB:", sum/1024}'
ps --no-headers -o rss -C php-fpm | awk '{sum+=$1} END {printf "Total RSS GB: %.3f\n", sum/1024/1024}'
```

Eso te da el total en **MB**.

**Calcular consumo medio de los workers PHP-FPM:**

```bash
ps --no-headers -o rss,cmd -C php-fpm | awk '{sum+=$1; n++} END {if(n>0) print "Workers:",n," Avg RSS MB:",sum/n/1024}'
```

> **Explicación:** Este comando calcula el número total de workers `php-fpm` activos y la memoria RAM media (RSS) que están consumiendo. Es la métrica clave para decidir cuántos workers puede soportar tu servidor. (`RAM total disponible / Avg RSS MB = Nº máximo teórico de workers`).

Ver consumo individual de cada worker PHP-FPM:

```bash
ps --no-headers -o pid,rss,cmd -C php-fpm | awk '{print $1, $2/1024 " MB", $3}'
```

> **Explicación:** Es el complemento perfecto al comando anterior. Lista cada worker por separado con su consumo de memoria en MB. Es extremadamente útil para detectar si un worker en concreto está consumiendo más memoria de lo normal, lo que podría indicar una fuga de memoria (*memory leak*) en un script.

Contar procesos de Apache:

```bash
ps aux | grep -c 'httpd\|apache2'
```

> **Explicación:** Proporciona un recuento rápido de cuántos procesos de Apache se están ejecutando. Sirve como una estimación similar a la de los workers de PHP-FPM.

### 2. Servidores de Bases de Datos (MySQL/MariaDB)

El rendimiento de la base de datos suele ser un cuello de botella. Estos comandos ayudan a diagnosticarlo.

Ver conexiones activas:

```bash
sudo mysql -e "SHOW PROCESSLIST;"
```

> **Explicación:** Muestra todas las conexiones activas a la base de datos, el usuario, la base de datos a la que están conectados y lo que están haciendo. Es el primer paso para ver la carga en tiempo real.

Comprobar si el límite de conexiones es suficiente:

```bash
sudo mysql -e "SHOW GLOBAL STATUS LIKE 'Max_used_connections';"
```

> **Explicación:** Muestra el número máximo de conexiones que se han utilizado simultáneamente desde que se inició el servidor. Si este valor está muy cerca de tu límite (`max_connections`), es una señal clara de que necesitas aumentarlo.

Localizar el log de consultas lentas (slow query log):

```bash
sudo mysql -e "SHOW GLOBAL VARIABLES LIKE 'slow_query_log%';"
```

> **Explicación:** Te indica si el log de consultas lentas está activado y en qué fichero se están guardando. Analizar este fichero es fundamental para encontrar y optimizar las consultas que ralentizan tu aplicación.

### 3. Límites del Kernel y Sistema Operativo

A veces, el límite no está en la aplicación, sino en el propio sistema operativo.

Comprobar los límites de descriptores de ficheros (file descriptors):

```bash
# Límite para la sesión actual
ulimit -n

# Límite máximo a nivel de sistema
cat /proc/sys/fs/file-max

# Total de ficheros abiertos actualmente en todo el sistema
sudo lsof | wc -l
```

> **Explicación:** Cada conexión de red y cada fichero abierto consume un descriptor de fichero. En servidores con mucho tráfico, es común alcanzar el límite por defecto. Si el número de ficheros abiertos se acerca peligrosamente al límite, necesitas aumentarlo en `/etc/security/limits.conf` para evitar errores de "Too many open files".

### 4. Pila de Red (Network Stack)

Diagnósticos a bajo nivel para problemas de conexión.

Revisar si se están descartando paquetes de red:

```bash
netstat -s | grep -i "dropped"
# O con el comando ip
ip -s link
```

> **Explicación:** Si ves un número creciente de paquetes descartados (`dropped`), podría indicar que los buffers de red del kernel son demasiado pequeños para la cantidad de tráfico que está recibiendo el servidor, o un problema de hardware.

Ver la cola de conexiones pendientes del kernel:

```bash
sysctl net.core.somaxconn
```

> **Explicación:** Muestra cuántas conexiones completadas pueden estar en cola esperando a que el servicio (`nginx`, `apache`, etc.) las acepte. Si tienes picos de tráfico muy altos, puede que necesites aumentar este valor y el parámetro correspondiente en tu servidor web (`backlog` en nginx) para evitar que se rechacen conexiones.