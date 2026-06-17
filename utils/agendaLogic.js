// --- MÓDULO 02 y 04: Facundo y Valentín ---
export const validateTimeRange = (start, end) => start < end;
export const validateInterval = (minutes) => minutes >= 0 && minutes <= 120;
export const validateEmail = (email) => email.includes('@') && email.includes('.');
export const validateBlockRange = (start, end) => new Date(start) < new Date(end);
export const hasConflicts = (date, bookings) => bookings.includes(date);
export const checkMaxTurnos = (current, max) => current < max;

// --- MÓDULO 04: Álvaro y Augusto ---
export const addHoldTime = (currentTime) => new Date(currentTime.getTime() + 15 * 60000);
export const isHoldExpired = (holdTime, now) => now > holdTime;
export const validateRequiredFields = (name, email) => name !== '' && email !== '';
export const cancelBooking = (status) => status === 'Reservado' ? 'Cancelado' : status;
export const checkAdvanceTime = (hours) => hours >= 1 && hours <= 72;
export const validateNoteLength = (note) => note.length <= 500;

// --- MÓDULO 07 (Roles y Empleados): Alejo y Valentin ---
export const assignRole = (user, role) => ({ ...user, role });
export const checkPermission = (role, action) => {
  if (role === 'Admin') return true;
  if (role === 'Recepcionista' && action === 'cancel_booking') return true;
  return false;
};
export const validateEmployeeData = (name) => name.length > 2;
export const assignShift = (employee, shift) => ({ ...employee, shift });
export const checkAvailability = (employee, date) => !employee.busyDays.includes(date);
export const isRoleValid = (role) => ['Admin', 'Recepcionista', 'Profesional'].includes(role);

// --- MÓDULO 08 (Facturación y Pagos): Martin y Luciano ---
export const calculateTotal = (price, taxRate) => price + (price * taxRate);
export const applyDiscount = (price, discount) => price - discount;
export const generateInvoiceStatus = (amount) => amount > 0 ? 'Pendiente' : 'Pagado';
export const processPayment = (invoice, amount) => invoice.total === amount ? 'Pagado' : 'Pendiente';
export const checkPaymentTimeout = (hoursPassed) => hoursPassed > 24;
export const processRefund = (status) => status === 'Pagado' ? 'Reembolsado' : 'Error';