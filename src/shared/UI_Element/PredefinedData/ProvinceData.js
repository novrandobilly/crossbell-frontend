import CitiesData from './CitiesData';

export const ProvinceToCity = (province, setCity) => {
  switch (province) {
    case 'Aceh':
      setCity(CitiesData.Aceh);
      break;

    case 'Sumatera Utara':
      setCity(CitiesData.SumUt);
      break;

    case 'Sumatera Barat':
      setCity(CitiesData.SumBar);
      break;

    case 'Riau':
      setCity(CitiesData.Riau);
      break;

    case 'Kepulauan Riau':
      setCity(CitiesData.KepulauanRiau);
      break;

    case 'Jambi':
      setCity(CitiesData.Jambi);
      break;

    case 'Sumatera Selatan':
      setCity(CitiesData.SumSel);
      break;

    case 'Kepulauan Bangka Belitung':
      setCity(CitiesData.BangkaBelitung);
      break;

    case 'Bengkulu':
      setCity(CitiesData.Bengkulu);
      break;

    case 'Lampung':
      setCity(CitiesData.Lampung);
      break;

    case 'DKI Jakarta':
      setCity(CitiesData.Jakarta);
      break;

    case 'Banten':
      setCity(CitiesData.Banten);
      break;

    case 'Jawa Barat':
      setCity(CitiesData.JawaBarat);
      break;

    case 'Jawa Tengah':
      setCity(CitiesData.JawaTengah);
      break;

    case 'DI Yogyakarta':
      setCity(CitiesData.Yogyakarta);
      break;

    case 'Jawa Timur':
      setCity(CitiesData.JawaTimur);
      break;

    case 'Bali':
      setCity(CitiesData.Bali);
      break;

    case 'Nusa Tenggara Barat':
      setCity(CitiesData.NTB);
      break;

    case 'Nusa Tenggara Timur':
      setCity(CitiesData.NTT);
      break;

    case 'Kalimantan Barat':
      setCity(CitiesData.KalBar);
      break;

    case 'Kalimantan Timur':
      setCity(CitiesData.KalTim);
      break;

    case 'Kalimantan Tengah':
      setCity(CitiesData.KalTengh);
      break;

    case 'Kalimantan Utara':
      setCity(CitiesData.KalUt);
      break;

    case 'Kalimantan Selatan':
      setCity(CitiesData.KalSel);
      break;

    case 'Gorontalo':
      setCity(CitiesData.Gorontalo);
      break;

    case 'Sulawesi Barat':
      setCity(CitiesData.SulBar);
      break;

    case 'Sulawesi Timur':
      setCity(CitiesData.SumTim);
      break;

    case 'Sulawesi Tengah':
      setCity(CitiesData.SulTengah);
      break;

    case 'Sulawesi Tenggara':
      setCity(CitiesData.SulTenggara);
      break;

    case 'Sulawesi Selatan':
      setCity(CitiesData.SulSel);
      break;

    case 'Maluku':
      setCity(CitiesData.Maluku);
      break;

    case 'Maluku Utara':
      setCity(CitiesData.MalukuUtara);
      break;

    case 'Papua':
      setCity(CitiesData.Papua);
      break;

    case 'Papua Barat':
      setCity(CitiesData.PapuaBarat);
      break;

    default: {
      return CitiesData.default;
    }
  }
};

const ProvinceList = [
  'Aceh',
  'Sumatera Utara',
  'Sumatera Barat',
  'Riau',
  'Kepulauan Riau',
  'Jambi',
  'Sumatera Selatan',
  'Kepulauan Bangka Belitung',
  'Bengkulu',
  'Lampung',
  'DKI Jakarta',
  'Banten',
  'Jawa Barat',
  'Jawa Tengah',
  'DI Yogyakarta',
  'Jawa Timur',
  'Bali',
  'Nusa Tenggara Barat',
  'Nusa Tenggara Timur',
  'Kalimantan Barat',
  'Kalimantan Timur',
  'Kalimantan Tengah',
  'Kalimantan Utara',
  'Kalimantan Selatan',
  'Sulawesi Utara',
  'Gorontalo',
  'Sulawesi Tengah',
  'Sulawesi Barat',
  'Sulawesi Tenggara',
  'Sulawesi Selatan',
  'Maluku',
  'Maluku Utara',
  'Papua Barat',
  'Papua',
];

export default ProvinceList;
