// En este módulo, las fechas abarcan desde el mediodía del día seleccionado hasta el mediodía del día siguiente,
// reflejando una jornada de trabajo del bar en vez de una fecha de calendario.
// La jornada está definida como el momento del mediodía de una fecha determinada hasta las 11:59:59:999 del día posterior,
// pudiendo soportar así la transición de calendario que sucede luego de la medianoche de un día, momento en el que
// el bar está aún operando.

const moment = require("moment");

/**
 * Obtiene el Date que marca el inicio de una jornada de trabajo
 * @param date
 * @returns {Date}
 * @private
 */
const _getWorkdayStart = date => {
  return moment(date)
    .set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
    .toDate();
};

/**
 * Obtiene el Date que marca el fin de una jornada de trabajo
 * @param date
 * @returns {Date}
 * @private
 */
const _getWorkdayEnd = date => {
  return moment(date)
    .set({ hour: 11, minute: 59, second: 59, millisecond: 999 })
    .add(1, "day")
    .toDate();
};

/**
 * Obtiene el par de Dates que marcan el inicio y el fin de una jornada de trabajo
 * @param date
 * @returns {{endingDate: Date, startingDate: Date}}
 */
const getWorkday = date => {
  return {
    startingDate: _getWorkdayStart(date),
    endingDate: _getWorkdayEnd(date)
  };
};

/**
 * Obtiene el par de Dates que marcan un intervalo de jornadas de trabajo contiguas
 * @param dateFrom
 * @param dateTo
 * @returns {{endingDate: Date, startingDate: Date}}
 */
const getWorkdayInterval = (dateFrom, dateTo) => {
  return {
    startingDate: _getWorkdayStart(dateFrom),
    endingDate: _getWorkdayEnd(dateTo)
  };
};

/**
 * Devuelve un boolean que indica si la fecha pasada como parámetro está comprendida
 * o no en la actual jornada de trabajo
 * @param date
 * @returns {boolean}
 */
const dateInCurrentWorkday = date => {
  const dateAsMoment = moment(date);
  const today = new Date();

  const workday = getWorkday(today);
  const startingDate = moment(workday.startingDate);
  const endingDate = moment(workday.endingDate);
  return (
    dateAsMoment.isSameOrAfter(startingDate) &&
    dateAsMoment.isSameOrBefore(endingDate)
  );
};

/**
 * Valida si la fecha de redención de un cupón determinado está comprendida o no
 * dentro de la jornada de trabajo actual.
 * @param redemption
 * @returns {boolean}
 */
const redeemedToday = redemption => {
  const redeemedDate = moment(redemption.createdAt);
  return dateInCurrentWorkday(redeemedDate);
};

module.exports = {
  dateInCurrentWorkday,
  getWorkday,
  getWorkdayInterval,
  redeemedToday
};
