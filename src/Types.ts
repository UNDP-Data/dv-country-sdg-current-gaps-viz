export interface IndicatorListType {
  Indicator: string;
  'Indicator Description': string;
}

export interface TargetListType {
  Target: string;
  'Target Description': string;
  Indicators: IndicatorListType[];
}

export interface SDGSListType {
  Goal: string;
  'Goal Name': string;
  Targets: TargetListType[];
}

export interface IndicatorYearDataSDGPush {
  year: number;
  withSDGPush: number;
  withoutSDGPush: number;
}

export interface IndicatorDataSDGPush {
  Indicator: string;
  yearlyData: IndicatorYearDataSDGPush[];
}

export interface IndicatorStatusType {
  goal: string;
  target: string;
  indicator: string;
  status: 'On Track' | 'Identified Gap' | 'For Review' | null;
}
export interface TargetStatusType {
  goal: string;
  target: string;
  status: 'On Track' | 'Identified Gap' | 'For Review' | null;
}

export interface TargetStatusWithDetailsType extends TargetStatusType {
  description: string;
}

export interface GoalStatusType {
  goal: number;
  noOfIndicatorsWithData: number;
  status: 'On Track' | 'Identified Gap' | 'For Review' | null;
}

export interface ValuesDataType {
  year: number;
  value: number;
  label?: string;
}

export interface TimeSeriesDataType {
  series: string;
  goal: string;
  target: string;
  indicator: string;
  seriesDescription: string;
  values: ValuesDataType[];
  methodology?: {
    targetValue?: number;
    normativeDirection?:
      | 'increase'
      | 'decrease'
      | 'not increase'
      | 'not decrease';
    value?: number;
    CAGRLimit?: number[];
    trendMethodology:
      | 'CAGRR'
      | 'CAGRA'
      | 'Binary'
      | 'Likert'
      | 'AARRR'
      | 'CAGRR+AARRR'
      | 'Doubling'
      | 'Halfing'
      | 'SpecialGINI';
    baselineYear: number;
    baseYear: null | number;
  };
  Age?:
    | 'ALLAGE'
    | '<1Y'
    | '<5Y'
    | '15-49'
    | '<1M'
    | '30-70'
    | '15+'
    | '10-14'
    | '15-19'
    | '16-65'
    | '10+'
    | '15-24'
    | '18-29'
    | '20-24'
    | '18-24'
    | '25-44'
    | '45-59'
    | '60+'
    | '7-17';
  Location?: 'ALLAREA' | 'URBAN' | 'RURAL';
  Sex?: 'BOTHSEX' | 'FEMALE' | 'MALE';
  'Reporting Type'?: string;
  Quantile?: 'B50' | '_T';
  'Name of international institution'?:
    | 'UNGA'
    | 'WTO'
    | 'IFC'
    | 'IMF'
    | 'ECOSOC'
    | 'IBRD'
    | 'UNSC'
    | 'AFDB'
    | 'FSB';
  'Type of product'?: 'CLO' | 'MEO' | 'NFO' | 'ARM' | 'AGR' | 'TEX' | 'ALP';
  'Food Waste Sector'?: 'HHS';
  Activity?: 'ISIC4_C' | 'TOTAL' | 'INDUSTRIES' | 'ISIC4_C10T32X19' | 'ISIC4_A';
  'Level of requirement'?: 'TOTAL';
  'Frequency of Chlorophyll-a concentration'?: 'High';
  'Mountain Elevation'?: '5';
  'Type of speed'?: 'ANYS';
  'Name of non-communicable disease'?: 'CAR';
  'Type of occupation'?:
    | 'DENT'
    | '_T'
    | 'isco08-6'
    | 'isco08-3'
    | 'isco08-9'
    | 'isco08-8'
    | 'isco08-1'
    | 'isco08-4'
    | 'isco08-7'
    | 'isco08-5'
    | 'isco08-2'
    | 'isco08-0'
    | 'isco08-X';
  'IHR Capacity'?: 'IHR09';
  'Education level'?: 'LOWSEC' | 'UPPSEC' | 'SECOND' | 'GRAD23' | 'PRIMAR';
  'Type of skill'?: 'PCPR' | 'LITE' | 'SKILL_READ';
  'Level/Status'?: '_T';
  'Deviation Level'?: 'EXTREME' | 'MEDIUM';
  'Mode of transportation'?: 'AIR' | 'ROA' | 'SEA';
  'Type of renewable technology'?: 'SOLAR';
  'Fiscal intervention stage'?: 'POSTFIS_CON_INC';
  Counterpart?: 'ZM';
  Cities?: 'JOHANNESBURG';
  'Sampling Stations'?: 'ALGOA';
  status:
    | 'Target Achieved'
    | 'On Track'
    | 'Target Not Achieved'
    | 'Fair progress but acceleration needed'
    | 'Limited or No Progress'
    | 'Insufficient Data'
    | 'No Data After 2015'
    | 'Deterioration';
}

export interface TimeSeriesDataTypeWithStatusCode extends TimeSeriesDataType {
  statusCode: 1 | 2 | 3 | 4 | 5;
}

export interface CountryDataType {
  countryCode: string;
  goalStatus: GoalStatusType[];
  targetStatus: TargetStatusType[];
  indicatorStatus: IndicatorStatusType[];
  tsData: TimeSeriesDataType[];
}
