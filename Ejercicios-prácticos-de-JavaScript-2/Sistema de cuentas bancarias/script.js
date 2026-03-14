// Clase para representar una cuenta bancaria
class CuentaBancaria {
    constructor(nombreTitular, saldoInicial = 0) {
        this.nombreTitular = nombreTitular;
        this.saldo = saldoInicial;
        this.historial = [];
        
        if (saldoInicial > 0) {
            this.historial.push({
                tipo: 'Depósito Inicial',
                monto: saldoInicial,
                fecha: new Date(),
                saldoResultante: this.saldo
            });
        }
    }

    // Método para ingresar dinero
    ingresar(monto) {
        if (monto <= 0) {
            return {
                exito: false,
                mensaje: 'El monto debe ser mayor a 0'
            };
        }

        this.saldo += monto;
        this.historial.push({
            tipo: 'Depósito',
            monto: monto,
            fecha: new Date(),
            saldoResultante: this.saldo
        });

        return {
            exito: true,
            mensaje: `Depósito de $${monto.toFixed(2)} realizado exitosamente`,
            nuevoSaldo: this.saldo
        };
    }

    // Método para retirar dinero
    retirar(monto) {
        if (monto <= 0) {
            return {
                exito: false,
                mensaje: 'El monto debe ser mayor a 0'
            };
        }

        if (monto > this.saldo) {
            return {
                exito: false,
                mensaje: `Fondos insuficientes. Saldo disponible: $${this.saldo.toFixed(2)}`
            };
        }

        this.saldo -= monto;
        this.historial.push({
            tipo: 'Retiro',
            monto: monto,
            fecha: new Date(),
            saldoResultante: this.saldo
        });

        return {
            exito: true,
            mensaje: `Retiro de $${monto.toFixed(2)} realizado exitosamente`,
            nuevoSaldo: this.saldo
        };
    }

    // Método para consultar saldo
    consultarSaldo() {
        return this.saldo;
    }

    // Método para obtener historial formateado
    obtenerHistorial() {
        return this.historial.map(transaccion => ({
            tipo: transaccion.tipo,
            monto: transaccion.monto,
            fecha: transaccion.fecha.toLocaleString('es-ES'),
            saldoResultante: transaccion.saldoResultante
        }));
    }
}

// Gestor de cuentas bancarias
class GestorCuentas {
    constructor() {
        this.cuentas = new Map();
        this.cuentaActiva = null;
        this.idContador = 0;
    }

    crearCuenta(nombreTitular, saldoInicial = 0) {
        this.idContador++;
        const id = this.idContador;
        this.cuentas.set(id, new CuentaBancaria(nombreTitular, saldoInicial));
        return id;
    }

    seleccionarCuenta(id) {
        if (this.cuentas.has(id)) {
            this.cuentaActiva = id;
            return true;
        }
        return false;
    }

    obtenerCuentaActiva() {
        if (this.cuentaActiva !== null) {
            return this.cuentas.get(this.cuentaActiva);
        }
        return null;
    }

    obtenerTodasLasCuentas() {
        return Array.from(this.cuentas.entries()).map(([id, cuenta]) => ({
            id,
            nombre: cuenta.nombreTitular,
            saldo: cuenta.saldo
        }));
    }
}

// Instancia global del gestor
const gestor = new GestorCuentas();

// Funciones para la interfaz
function crearCuenta() {
    const nombre = document.getElementById('nombreCliente').value.trim();
    const saldoInicial = parseFloat(document.getElementById('saldoInicial').value) || 0;

    if (!nombre) {
        mostrarMensaje('Por favor, ingresa el nombre del cliente', 'error');
        return;
    }

    if (saldoInicial < 0) {
        mostrarMensaje('El saldo inicial no puede ser negativo', 'error');
        return;
    }

    const id = gestor.crearCuenta(nombre, saldoInicial);
    mostrarMensaje(`Cuenta creada exitosamente para ${nombre}`, 'exito');

    // Actualizar lista de cuentas
    actualizarListaCuentas();

    // Limpiar formulario
    document.getElementById('nombreCliente').value = '';
    document.getElementById('saldoInicial').value = '0';
}

function seleccionarCuenta() {
    const select = document.getElementById('cuentasDisponibles');
    const id = parseInt(select.value);

    if (!id) {
        document.getElementById('infoSeccion').style.display = 'none';
        document.getElementById('historialSeccion').style.display = 'none';
        return;
    }

    if (gestor.seleccionarCuenta(id)) {
        actualizarInformacionCuenta();
        document.getElementById('infoSeccion').style.display = 'block';
        document.getElementById('historialSeccion').style.display = 'block';
    }
}

function actualizarListaCuentas() {
    const select = document.getElementById('cuentasDisponibles');
    const cuentas = gestor.obtenerTodasLasCuentas();

    select.innerHTML = '<option value="">-- Selecciona una cuenta --</option>';

    cuentas.forEach(cuenta => {
        const option = document.createElement('option');
        option.value = cuenta.id;
        option.textContent = `${cuenta.nombre} - Saldo: $${cuenta.saldo.toFixed(2)}`;
        select.appendChild(option);
    });
}

function actualizarInformacionCuenta() {
    const cuenta = gestor.obtenerCuentaActiva();

    if (!cuenta) return;

    document.getElementById('nombreTitular').textContent = cuenta.nombreTitular;
    document.getElementById('saldoActual').textContent = `$${cuenta.consultarSaldo().toFixed(2)}`;

    // Actualizar historial
    actualizarHistorial();

    // Limpiar campos de operaciones
    document.getElementById('montoIngreso').value = '';
    document.getElementById('montoRetiro').value = '';
}

function ingresarDinero() {
    const cuenta = gestor.obtenerCuentaActiva();

    if (!cuenta) {
        mostrarMensaje('Debes seleccionar una cuenta primero', 'error');
        return;
    }

    const monto = parseFloat(document.getElementById('montoIngreso').value);

    if (isNaN(monto)) {
        mostrarMensaje('Por favor, ingresa un monto válido', 'error');
        return;
    }

    const resultado = cuenta.ingresar(monto);

    if (resultado.exito) {
        mostrarMensaje(resultado.mensaje, 'exito');
        actualizarInformacionCuenta();
        actualizarListaCuentas();
        document.getElementById('montoIngreso').value = '';
    } else {
        mostrarMensaje(resultado.mensaje, 'error');
    }
}

function retirarDinero() {
    const cuenta = gestor.obtenerCuentaActiva();

    if (!cuenta) {
        mostrarMensaje('Debes seleccionar una cuenta primero', 'error');
        return;
    }

    const monto = parseFloat(document.getElementById('montoRetiro').value);

    if (isNaN(monto)) {
        mostrarMensaje('Por favor, ingresa un monto válido', 'error');
        return;
    }

    const resultado = cuenta.retirar(monto);

    if (resultado.exito) {
        mostrarMensaje(resultado.mensaje, 'exito');
        actualizarInformacionCuenta();
        actualizarListaCuentas();
        document.getElementById('montoRetiro').value = '';
    } else {
        mostrarMensaje(resultado.mensaje, 'error');
    }
}

function actualizarHistorial() {
    const cuenta = gestor.obtenerCuentaActiva();

    if (!cuenta) return;

    const historial = cuenta.obtenerHistorial();
    const historialContenedor = document.getElementById('historialContenedor');

    if (historial.length === 0) {
        historialContenedor.innerHTML = '<p class="sin-historial">Sin transacciones aún</p>';
        return;
    }

    historialContenedor.innerHTML = historial
        .reverse()
        .map((transaccion, index) => `
            <div class="transaccion ${transaccion.tipo === 'Retiro' ? 'retiro' : 'deposito'}">
                <div class="tipo-transaccion">${transaccion.tipo}</div>
                <div class="monto">$${transaccion.monto.toFixed(2)}</div>
                <div class="fecha">${transaccion.fecha}</div>
                <div class="saldo-resultante">Saldo: $${transaccion.saldoResultante.toFixed(2)}</div>
            </div>
        `)
        .join('');
}

function mostrarMensaje(texto, tipo) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `mensaje ${tipo}`;

    // Ocultar después de 4 segundos
    setTimeout(() => {
        mensajeDiv.className = 'mensaje';
        mensajeDiv.textContent = '';
    }, 4000);
}
