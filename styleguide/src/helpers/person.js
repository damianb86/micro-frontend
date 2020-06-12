export const getStreet = record => [record.street, record.street2].filter(a => a).join(' ');

export const getLocality = (record) => {
  const { city, state, postalCode } = record;
  const locality = [city, state, postalCode];

  return locality.filter(a => a).join(', ');
};

export const getRegionName = (record, regionEntities) => {
  const region = regionEntities[record.regionId];

  if (region && region.name) {
    return region.name;
  }

  return null;
};

export const getYear = (startYear, endYear) => {
  const yearDuration = [startYear];
  yearDuration.push(endYear || 'present');

  return yearDuration.join(' - ');
};

export const getEquity = (equity, equityType, currencyCode = 'USD') => {
  if (equity) {
    switch (equityType) {
      case 'percent':
        return equity + '%';
      case 'cash':
        return Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode, minimumFractionDigits: 0 }).format(equity);
      default:
        return Number(parseInt(equity, 10).toFixed(0)) + ' shares';
    }
  }

  return null;
};

export const getBonus = (bonus, bonusType, currencyCode = 'USD') => {
  if (bonusType === 'cash') {
    return Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode, minimumFractionDigits: 0 }).format(bonus);
  }

  return bonus + '%';
};

export function formatDates(startMonth, startYear, endMonth, endYear) {
  const start = [startMonth && (startMonth < 10 ? `0${startMonth}` : startMonth), startYear].filter(a => a).join("/").trim();
  const end = [endMonth && (endMonth < 10 ? `0${endMonth}` : endMonth), endYear].filter(a => a).join("/").trim();

  if (start && end) {
    return [start, end].filter(a => a).join(" to ");
  } else if (start) {
    return `${start} to present`;
  } else if (end) {
    return end;
  }

  return '';
}

/**
 * calculateExperience
 * returns empty string if startYear is not present, and candidate's experience otherwise
 * @param {number} [startMonth]
 * @param {number} [startYear]
 * @param {number} [endMonth]
 * @param {number} [endYear]
 */
export const calculateExperience = (startMonth, startYear, endMonth, endYear) => {
  if (!startYear) return false;

  const d = Date.now();
  const presentYear = new Date(d).getFullYear();
  const presentMonth = new Date(d).getMonth() + 1;

  const start = startMonth ? ((startYear * 12) + startMonth) : ((startYear * 12) + 1);
  let end;

  if (endMonth) {
    end = (endYear * 12) + endMonth;
  } else if (endYear) {
    end = (endYear * 12) + 1;
  } else {
    end = (presentYear * 12) + presentMonth;
  }

  const diff = end - start;
  const yearDiff = Math.floor(diff / 12);
  const monthDiff = diff % 12;

  let exp = '';

  if (yearDiff === 1) {
    exp += `${yearDiff} yr`;
  } else if (yearDiff > 1) {
    exp += `${yearDiff} yrs`;
  }

  if (yearDiff > 0 && monthDiff > 0) {
    exp += ' ';
  }

  if (monthDiff > 0) {
    exp += `${monthDiff} mo`;
  }

  return exp;
};
