import { IOperationsData } from '../features/operations/table/config/operationsTypes'

export const operationsData: IOperationsData[] = [
  {
    id: '1',
    date: '23.03.2025',
    iconType: 'minus',
    organization: { name: 'ИП Тедорадзе А.С.', account: '2558, Сбер 9042' },
    counterparty:
      '1 ФИЛИАЛ «ЦЕНТРАЛЬНЫЙ» БАНКА ВТБ (ПАО) (7702070139) ФИЛИАЛ «ЦЕНТРАЛЬНЫЙ» БАНКА ВТБ (ПАО) (7702070139)',
    nameOperation:
      'Пять платежей по договору № 07 от 07.10.2024 (ДС № 01, 02, 03, 04, 05) за выполнение подсобных работ',
    caseAndDeal: { case: 'Разведки', deal: 'Начальная Мурманск-22 НОВЫЙ' },
    article: {
      article: 'Заработная плата',
      subArticle: 'Выплата аванса 40%',
    },
    amount: {
      status: 'negative',
      value: '-835 783 222.64',
    },
  },
  {
    id: '2',
    date: '23.03.2025',
    iconType: 'plus',
    organization: { name: 'ИП Рога и копыта А.С.', account: '2558, Сбер 9042' },
    counterparty: '2 ФИЛИАЛ «ЦЕНТРАЛЬНЫЙ» БАНКА ВТБ (ПАО) (7702070139)',
    nameOperation:
      'Шесть платежей по договору № 07 от 07.10.2024 (ДС № 01, 02, 03, 04, 05) за выполнение подсобных работ',
    caseAndDeal: { case: 'Разведки', deal: 'Начальная Мурманск-22 НОВЫЙ' },
    article: {
      article: 'Оплата по Договору',
      subArticle: '',
    },
    amount: {
      status: 'positive',
      value: '+835 783 222.64',
    },
  },
  {
    id: '3',
    date: '23.03.2025',
    iconType: 'round',
    organization: { name: 'ИП Пирожков А.С.', account: '2558, Сбер 9042' },
    counterparty: '3 ФИЛИАЛ «ЦЕНТРАЛЬНЫЙ» БАНКА ВТБ (ПАО) (7702070139)',
    nameOperation:
      'Один платеж по договору № 07 от 07.10.2024 (ДС № 01, 02, 03, 04, 05) за выполнение подсобных работ',
    caseAndDeal: { case: 'Раскопки', deal: 'Конечная Москва-11' },
    article: {
      article: 'Внутренний заем',
      subArticle: '',
    },
    amount: {
      status: 'neutral',
      value: '835 783 222.64',
    },
  },
  {
    id: '4',
    date: '23.03.2025',
    iconType: 'plus',
    organization: { name: 'ИП Иванов А.С.', account: '2558, Сбер 9042' },
    counterparty: '3 ФИЛИАЛ «ЦЕНТРАЛЬНЫЙ» БАНКА ВТБ (ПАО) (7702070139)',
    nameOperation:
      'Два платежа по договору № 07 от 07.10.2024 (ДС № 01, 02, 03, 04, 05) за выполнение подсобных работ',
    caseAndDeal: { case: 'Разведки', deal: 'Начальная Мурманск-22 НОВЫЙ' },
    article: {
      article: 'Заработная плата',
      subArticle: 'Выплата аванса 40%',
    },
    amount: {
      status: 'positive',
      value: '+835 783 222.64',
    },
  },
]
