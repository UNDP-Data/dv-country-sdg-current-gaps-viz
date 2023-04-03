import { json } from 'd3-request';
import sortBy from 'lodash.sortby';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CountryDataType, GoalStatusType } from './Types';
import { describeArc } from './Utils/getArc';
import { getSDGIcon } from './Utils/getSDGIcon';

interface Props {
  country: string;
}

interface WidthProps {
  width: string;
}

const GraphContainer = styled.div<WidthProps>`
  width: ${props => props.width};
  flex-grow: 1;
  flex-basis: 30rem;
`;

function App(props: Props) {
  const { country } = props;
  const [data, setData] = useState<undefined | GoalStatusType[]>(undefined);
  const SDG_ICON_SIZE = 64;
  useEffect(() => {
    json(
      `https://raw.githubusercontent.com/UNDP-Data/data-sdg-accelerator-data/main/GapData/${country.toUpperCase()}.json`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any, d: CountryDataType) => {
        setData(d.goalStatus);
      },
    );
  }, [country]);
  return (
    <div className='undp-container flex-div flex-wrap flex-hor-align-center'>
      {data ? (
        <div
          className='flex-div flex-wrap'
          style={{
            gap: '2rem',
            width: '100%',
            maxWidth: '1440px',
            margin: 'auto',
          }}
        >
          <GraphContainer width='calc(40% - 1rem)'>
            <svg
              width='100%'
              style={{
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
              }}
              viewBox='0 0 360 360'
            >
              <path
                d={describeArc(
                  180,
                  180,
                  140,
                  0,
                  360 *
                    (sortBy(
                      data.filter(d => d.status === 'On Track'),
                      'goal',
                    ).length /
                      17),
                )}
                fill='none'
                strokeWidth={50}
                style={{ stroke: 'var(--dark-green)' }}
              />
              <path
                d={describeArc(
                  180,
                  180,
                  140,
                  360 *
                    (sortBy(
                      data.filter(d => d.status === 'On Track'),
                      'goal',
                    ).length /
                      17),
                  360 *
                    ((sortBy(
                      data.filter(d => d.status === 'On Track'),
                      'goal',
                    ).length +
                      sortBy(
                        data.filter(d => d.status === 'For Review'),
                        'goal',
                      ).length) /
                      17),
                )}
                fill='none'
                strokeWidth={50}
                style={{ stroke: 'var(--dark-yellow)' }}
              />
              <path
                d={describeArc(
                  180,
                  180,
                  140,
                  360 *
                    ((sortBy(
                      data.filter(d => d.status === 'On Track'),
                      'goal',
                    ).length +
                      sortBy(
                        data.filter(d => d.status === 'For Review'),
                        'goal',
                      ).length) /
                      17),
                  360 *
                    ((sortBy(
                      data.filter(d => d.status === 'On Track'),
                      'goal',
                    ).length +
                      sortBy(
                        data.filter(d => d.status === 'For Review'),
                        'goal',
                      ).length +
                      sortBy(
                        data.filter(d => d.status === 'Identified Gap'),
                        'goal',
                      ).length) /
                      17),
                )}
                fill='none'
                strokeWidth={50}
                style={{ stroke: 'var(--dark-red)' }}
              />
              <path
                d={describeArc(
                  180,
                  180,
                  140,
                  360 *
                    ((sortBy(
                      data.filter(d => d.status === 'On Track'),
                      'goal',
                    ).length +
                      sortBy(
                        data.filter(d => d.status === 'For Review'),
                        'goal',
                      ).length +
                      sortBy(
                        data.filter(d => d.status === 'Identified Gap'),
                        'goal',
                      ).length) /
                      17),
                  360,
                )}
                fill='none'
                strokeWidth={50}
                style={{ stroke: 'var(--gray-600)' }}
              />
              <text
                x={180}
                y={180}
                textAnchor='middle'
                style={{ fontFamily: 'proxima-nova' }}
                fontWeight='bold'
                fontSize='60px'
                dy={10}
              >
                {17}
              </text>
              <text
                x={180}
                y={180}
                textAnchor='middle'
                style={{ fontFamily: 'proxima-nova' }}
                fontWeight='bold'
                fontSize='20px'
                dy={35}
              >
                SDGs
              </text>
            </svg>
          </GraphContainer>
          <GraphContainer width='calc(60% - 1rem)'>
            <div className='margin-bottom-09'>
              <h4
                className='undp-typography margin-bottom-00'
                style={{ color: 'var(--dark-green)' }}
              >
                <span className='bold'>
                  {sortBy(
                    data.filter(d => d.status === 'On Track'),
                    'goal',
                  ).length > 0
                    ? sortBy(
                        data.filter(d => d.status === 'On Track'),
                        'goal',
                      ).length
                    : 'No'}{' '}
                  {sortBy(
                    data.filter(d => d.status === 'On Track'),
                    'goal',
                  ).length > 1
                    ? 'SDGs'
                    : 'SDG'}
                </span>{' '}
                On Track
              </h4>
              <p
                className='undp-typography small-font italics'
                style={{ color: 'var(--gray-500)' }}
              >
                The country is on track to fulfil the SDG by 2030
              </p>
              <div className='flex-div gap-05 flex-wrap margin-bottom-05'>
                <div
                  className='flex-div gap-05 flex-wrap'
                  style={{ alignContent: 'flex-start' }}
                >
                  {sortBy(
                    data.filter(d => d.status === 'On Track'),
                    'goal',
                  ).map((d, i: number) => (
                    <div key={i}>
                      {getSDGIcon(`SDG ${d.goal}`, SDG_ICON_SIZE)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='margin-bottom-09'>
              <h4
                className='undp-typography margin-bottom-00'
                style={{ color: 'var(--dark-yellow)' }}
              >
                <span className='bold'>
                  {sortBy(
                    data.filter(d => d.status === 'For Review'),
                    'goal',
                  ).length > 0
                    ? sortBy(
                        data.filter(d => d.status === 'For Review'),
                        'goal',
                      ).length
                    : 'No'}{' '}
                  {sortBy(
                    data.filter(d => d.status === 'For Review'),
                    'goal',
                  ).length > 1
                    ? 'SDGs'
                    : 'SDG'}
                </span>{' '}
                For Review
              </h4>
              <p
                className='undp-typography small-font italics'
                style={{ color: 'var(--gray-500)' }}
              >
                With current progress the country will miss the SDG by 2030 by a
                small margin
              </p>
              <div className='flex-div gap-05 flex-wrap margin-bottom-05'>
                <div
                  className='flex-div gap-05 flex-wrap'
                  style={{ alignContent: 'flex-start' }}
                >
                  {sortBy(
                    data.filter(d => d.status === 'For Review'),
                    'goal',
                  ).map((d, i: number) => (
                    <div key={i}>
                      {getSDGIcon(`SDG ${d.goal}`, SDG_ICON_SIZE)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='margin-bottom-09'>
              <h4
                className='undp-typography margin-bottom-00'
                style={{ color: 'var(--dark-red)' }}
              >
                <span className='bold'>
                  {
                    sortBy(
                      data.filter(d => d.status === 'Identified Gap'),
                      'goal',
                    ).length
                  }{' '}
                  SDG
                </span>{' '}
                Identified Gaps
              </h4>
              <p
                className='undp-typography small-font italics'
                style={{ color: 'var(--gray-500)' }}
              >
                With current progress the country will miss the SDG by 2030 by a
                large margin
              </p>
              <div className='flex-div gap-05 flex-wrap margin-bottom-05'>
                <div
                  className='flex-div gap-05 flex-wrap'
                  style={{ alignContent: 'flex-start' }}
                >
                  {sortBy(
                    data.filter(d => d.status === 'Identified Gap'),
                    'goal',
                  ).map((d, i: number) => (
                    <div key={i}>
                      {getSDGIcon(`SDG ${d.goal}`, SDG_ICON_SIZE)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h4
                className='undp-typography margin-bottom-00'
                style={{ color: 'var(--gray-600)' }}
              >
                <span className='bold'>
                  {
                    sortBy(
                      data.filter(d => d.status === null),
                      'goal',
                    ).length
                  }{' '}
                  SDG
                </span>{' '}
                Gaps NA
              </h4>
              <p
                className='undp-typography small-font italics'
                style={{ color: 'var(--gray-500)' }}
              >
                Country doesn’t have enough data to identify the progress of the
                SDG
              </p>
              <div className='flex-div gap-05 flex-wrap margin-bottom-05'>
                <div
                  className='flex-div gap-05 flex-wrap'
                  style={{ alignContent: 'flex-start' }}
                >
                  {sortBy(
                    data.filter(d => d.status === null),
                    'goal',
                  ).map((d, i: number) => (
                    <div key={i}>
                      {getSDGIcon(`SDG ${d.goal}`, SDG_ICON_SIZE)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GraphContainer>
        </div>
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}

export default App;
