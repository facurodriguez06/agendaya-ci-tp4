import * as logic from '../utils/agendaLogic';

// Tests para las utilidades de la agenda.
describe('Pruebas TP4 - Grupo 01 (AgendaYA)', () => {

  // 1: validaciones de horarios, intervalos y formato de email
  describe('1. Pruebas Facundo Rodriguez (M02 y M04)', () => {
    test('Valida franja horaria: fin debe ser mayor a inicio', () => {
      expect(logic.validateTimeRange('09:00', '13:00')).toBe(true);
      expect(logic.validateTimeRange('15:00', '14:00')).toBe(false);
    });
    test('Valida intervalo de turnos entre 0 y 120 min', () => {
      expect(logic.validateInterval(15)).toBe(true);
      expect(logic.validateInterval(130)).toBe(false);
    });
    test('Valida formato de correo HTML5', () => {
      expect(logic.validateEmail('facundo@dominio.com')).toBe(true);
      expect(logic.validateEmail('facundodominio.com')).toBe(false);
    });
  });

  // 2: bloqueos y conflictos con reservas existentes
  describe('2. Pruebas Valentin Fornes (M02 - Bloqueos)', () => {
    test('Valida rango de vacaciones (inicio menor a fin)', () => {
      expect(logic.validateBlockRange('2026-02-01', '2026-02-15')).toBe(true);
      expect(logic.validateBlockRange('2026-02-15', '2026-02-01')).toBe(false);
    });
    test('Detecta conflictos con reservas existentes al bloquear', () => {
      expect(logic.hasConflicts('2026-02-03', ['2026-02-03', '2026-02-08'])).toBe(true);
      expect(logic.hasConflicts('2026-02-05', ['2026-02-03', '2026-02-08'])).toBe(false);
    });
    test('Valida límite máximo de turnos diarios', () => {
      // Menos que el máximo -> permitido
      expect(logic.checkMaxTurnos(5, 10)).toBe(true); // Permitido
      // Igual al máximo -> no se permiten más
      expect(logic.checkMaxTurnos(10, 10)).toBe(false); // Bloqueado
    });
  });

  // 3: reservas temporales (hold) y campos requeridos
  describe('3. Pruebas Alvaro Tapia (M04 - Reservas temporales)', () => {
    test('Calcula expiración del Hold (+15 min)', () => {
      const now = new Date('2026-01-01T10:00:00');
      const expected = new Date('2026-01-01T10:15:00');
      expect(logic.addHoldTime(now)).toEqual(expected);
    });
    test('Verifica si el tiempo de Hold expiró', () => {
      const holdTime = new Date('2026-01-01T10:15:00');
      expect(logic.isHoldExpired(holdTime, new Date('2026-01-01T10:20:00'))).toBe(true);
    });
    test('Valida que nombre y correo sean obligatorios', () => {
      // Ambos campos presentes -> válido
      expect(logic.validateRequiredFields('Alvaro', 'alvaro@mail.com')).toBe(true);
      // Nombre vacío -> inválido
      expect(logic.validateRequiredFields('', 'alvaro@mail.com')).toBe(false);
    });
  });

  // 4: roles y permisos de usuarios/empleados
  describe('4. Pruebas Alejo Palavecino (M07 - Permisos)', () => {
    test('Asigna rol correctamente a un usuario', () => {
      expect(logic.assignRole({ name: 'Rocio' }, 'Admin').role).toBe('Admin');
    });
    test('Valida permisos específicos por rol', () => {
      expect(logic.checkPermission('Recepcionista', 'cancel_booking')).toBe(true);
      expect(logic.checkPermission('Recepcionista', 'delete_system')).toBe(false);
    });
    test('Valida datos mínimos del empleado', () => {
      expect(logic.validateEmployeeData('Roc')).toBe(true);
      expect(logic.validateEmployeeData('Ro')).toBe(false);
    });
  });

  // 5: funcionalidades relacionadas con empleados
  describe('5. Pruebas Valentin Mendez (M07 - Empleados)', () => {
    test('Asigna turno de trabajo a empleado', () => {
      expect(logic.assignShift({ name: 'Lisandro' }, 'Mañana').shift).toBe('Mañana');
    });
    test('Chequea disponibilidad del empleado en una fecha', () => {
      const emp = { busyDays: ['Lunes', 'Miércoles'] };
      expect(logic.checkAvailability(emp, 'Martes')).toBe(true);
    });
    test('Valida que el rol exista en el sistema', () => {
      expect(logic.isRoleValid('Profesional')).toBe(true);
      expect(logic.isRoleValid('Hacker')).toBe(false);
    });
  });

  //  6: facturación — cálculos simples de total y descuentos
  describe('6. Pruebas Martin Flores (M08 - Facturación)', () => {
    test('Calcula total con impuestos', () => {
      expect(logic.calculateTotal(1000, 0.21)).toBe(1210);
    });
    test('Aplica descuento al precio', () => {
      expect(logic.applyDiscount(1000, 200)).toBe(800);
    });
    test('Genera factura en estado Pendiente si hay monto', () => {
      expect(logic.generateInvoiceStatus(500)).toBe('Pendiente');
    });
  });

  // 7: pagos y reembolsos
  describe('7. Pruebas Luciano Romero (M08 - Pagos)', () => {
    test('Procesa pago exitoso si el monto es exacto', () => {
      expect(logic.processPayment({ total: 1000 }, 1000)).toBe('Pagado');
    });
    test('Valida timeout de 24hs para pagos pendientes', () => {
      expect(logic.checkPaymentTimeout(25)).toBe(true); // Expiró
    });
    test('Genera estado de reembolso', () => {
      expect(logic.processRefund('Pagado')).toBe('Reembolsado');
    });
  });

  // 8: casos misceláneos varios
  describe('8. Pruebas Augusto Berloin (M04/M02 - Misc)', () => {
    test('Cancela reserva correctamente', () => {
      expect(logic.cancelBooking('Reservado')).toBe('Cancelado');
    });
    test('Valida antelación entre 1 y 72 horas', () => {
      expect(logic.checkAdvanceTime(24)).toBe(true);
      expect(logic.checkAdvanceTime(80)).toBe(false);
    });
    test('Valida longitud de nota opcional (< 500 chars)', () => {
      expect(logic.validateNoteLength('Nota corta')).toBe(true);
    });
  });

});