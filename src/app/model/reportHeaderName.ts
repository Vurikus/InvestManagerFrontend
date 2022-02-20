export enum ReportHeaderName {
  id = 'ID',
  date = 'Дата',
  currencyInfo = 'Валюта',
// CrossProfit
  revenue = 'Выручка',
  costSales = 'Себестоимость',
  crossProfit = 'Валовая прибыль',
// OperatingProfit
  sellingAndMarketingCost = 'Коммерческие расходы',
  administrativeExpenses = 'Управленческие расходы',
  otherIncome = 'Прочие доходы',
  otherLosses = 'Прочие расходы',
  operatingProfit = 'Прибыль от продаж',
// NetProfit
  financeIncome = 'Финансовые доходы',
  financeCosts = 'Финансовые расходы',
  exchangeTransaction = 'Обменные валютные операции',
  incomeTax = 'Налог на прибыль',
  ownersProfit = 'Прибыль собственников',
  nonControlInterests = 'Неконтролирующие доли участия',
  netProfit = 'Чистая прибыль',
  netProfitBeforeTax = 'Прибыль до налогообложения',
// NonCurrentAssets
  nc_fixedAssets = 'Основные средства',
  nc_investmentsAssociates = 'Инвестиции в ассоц. компании',
  nc_goodwill = 'Гудвилл',
  nc_intangibleAssets = 'Нематериальные активы',
  nc_otherAssets = 'Прочие активы',
  nc_receivables = 'Дебиторская задолженность',
  nc_totalAssets = 'Итого внеоборотные активы',

// CurrentAssets
  c_inventories = 'Товарно-материальные запасы',
  c_otherAssets = 'Прочие активы',
  c_receivables = 'Дебиторская задолженность',
  c_currentIncomeTax = 'Налоговые активы',
  c_cash = 'Денежные средства и эквиваленты',
  c_totalAssets = 'Итого оборотные активы',

  totalAssets = 'Итого активы',

// Equity
  e_shareCapital = 'Акционерный капитал',
  e_additionalCapital = 'Эмиссионный доход, добавочный капитал',
  e_reserveCapital = 'Резервы',
  e_retainedEarning = 'Нераспределенная прибыль',
  e_totalOwners = 'Доход собственников',
  e_nonControlInterests = 'Неконтролирующая доля',
  e_totalEquity = 'Итого капитал',

// NonCurrentLiabilities
  ncl_borrowings = 'Кредиты и займы',
  ncl_otherLeaseLiabilities = '',
  ncl_tradePayables = '',
  ncl_contractLiabilities = '',
  ncl_deferredTaxLiabilities = 'Отложенные налоговые обязательства',
  ncl_totalNonCurLiabilities = 'Итого долгосрочные обязательства',

// CurrentLiabilities
  cl_borrowings = 'Кредиты и займы',
  cl_otherLeaseLiabilities = '',
  cl_tradePayables = '',
  cl_contractLiabilities = '',
  cl_currentTaxLiabilities = 'Текущие налоговые обязательства',
  cl_totalCurLiabilities = 'Итого краткосрочные обязательства',

  totalLiabilities = 'Итого обязательства',
// Other
  countStocks = 'Количество акций',
  profitPerStock = 'Прибыль (убыток) на акцию'
}

//https://englishlib.org/%D0%BC%D1%81%D1%84%D0%BE-%D0%B1%D1%83%D1%85%D0%B3%D0%B0%D0%BB%D1%82%D0%B5%D1%80%D1%81%D0%BA%D0%B8%D0%B9-%D0%B1%D0%B0%D0%BB%D0%B0%D0%BD%D1%81.html
//https://englishlib.org/%D0%BC%D1%81%D1%84%D0%BE-%D0%BE%D1%82%D1%87%D0%B5%D1%82-%D0%BE-%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D0%B8-%D0%B4%D0%B5%D0%BD%D0%B5%D0%B6%D0%BD%D1%8B%D1%85-%D1%81%D1%80%D0%B5%D0%B4%D1%81%D1%82.html
