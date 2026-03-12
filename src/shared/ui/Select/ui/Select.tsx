/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import Select from 'react-dropdown-select';
import { ISelectCProps, TSelectOption } from '../types';

import { Icon } from '@/shared/ui/Icon';

import './select.scss';
import { MultiSelOption } from '@/features/filtersMenu/types/type';

export const SelectC: FC<ISelectCProps> = (props) => {
  const {
    options,
    values,
    value,
    onChange,
    label,
    placeholder = '',
    className,
    disabled,
    searchable,
    multiselect = false,
    maxDisplayedTags = 1,
    displayedTagSuffix = '+ {count}',
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  // Мемоизированные значения
  const computedValues = useMemo<TSelectOption[] | MultiSelOption[]>(() => {
    if ((!values || values.length === 0) && value) {
      return [value];
    }
    return values ?? [];
  }, [values, value]);

  const handleChange = useCallback(
    (newValues: TSelectOption[] | MultiSelOption[]) => {
      onChange(newValues);
    },
    [onChange]
  );

  // Кастомный рендер контента для выбранных значений
  const customContentRenderer = useCallback(({ state, methods }: any) => {
    const totalSelected = state.values.length;
    
    if (totalSelected === 0) {
      return <div className="select__placeholder">{placeholder}</div>;
    }

    // Если не мультиселект или нет ограничения - показываем все
    if (!multiselect || !maxDisplayedTags) {
      return (
        <div className="select__values">
          {state.values.map((item: any, idx: number) => (
            <span key={item.value || idx} className="select__tag">
              {item.label}
              {multiselect && (
                <span 
                  className="select__tag-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    methods.removeItem(null, item);
                  }}
                >
                  ×
                </span>
              )}
            </span>
          ))}
        </div>
      );
    }

    // С ограничением
    const visibleCount = Math.min(totalSelected, maxDisplayedTags);
    const hiddenCount = totalSelected - visibleCount;

    return (
      <div className="select__values">
        {state.values.slice(0, visibleCount).map((item: any, idx: number) => (
          <span key={item.value || idx} className="select__tag">
            {item.label}
            <span 
              className="select__tag-remove"
              onClick={(e) => {
                e.stopPropagation();
                methods.removeItem(null, item);
              }}
            >
              ×
            </span>
          </span>
        ))}
        
        {hiddenCount > 0 && (
          <span 
            className="select__tag select__tag--count"
            title={state.values.slice(maxDisplayedTags).map((v: any) => v.label).join(', ')}
          >
            {displayedTagSuffix.replace('{count}', hiddenCount.toString())}
          </span>
        )}
      </div>
    );
  }, [placeholder, multiselect, maxDisplayedTags, displayedTagSuffix]);

  return (
    <div className={classNames('select-wrapper', className)}>
      <Select
        values={computedValues}
        options={options}
        onChange={handleChange}
        className="select"
        placeholder={placeholder}
        searchable={searchable}
        multi={multiselect}
        disabled={disabled}
        contentRenderer={multiselect ? customContentRenderer : undefined}
        onDropdownOpen={() => setIsFocused(true)}
        onDropdownClose={() => setIsFocused(false)}
        searchBy="label"
        dropdownHandle={false}
      />

      {label && (
        <label
          className={classNames('select-label', {
            'select-label--focused': isFocused || computedValues.length > 0,
          })}
        >
          {label}
        </label>
      )}

      {disabled && <Icon iconId="lock" className="select__icon_lock" />}
    </div>
  );
};