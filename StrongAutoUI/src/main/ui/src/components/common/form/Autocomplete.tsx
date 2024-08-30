import { css } from '@emotion/css';
import Transition, { TransitionHandle } from 'components/common/Transition';
import { StyledOption, StyledOptionsWrapper } from 'components/common/form/Autocomplete.styled';
import { StyledContainer, StyledFormFieldContainer, StyledInput } from 'components/common/form/Input.styled';
import FormFieldRightContainer from 'components/common/form/RightContainer';
import { useForm, useInput } from 'components/common/hooks';
import { AutocompleteOption, FormFieldProps } from 'components/common/form/types';
import { parseInputValue } from 'components/common/form/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type Props = FormFieldProps<'input'> & {
  onOptionChange?: (option?: AutocompleteOption) => void;
  options: AutocompleteOption[];
  clearButton?: boolean;
};

const Autocomplete: React.FC<Props> = ({
  label,
  fullwidth,
  clearButton = true,
  rightContainer,
  validate,
  options,
  ...props
}) => {
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<TransitionHandle>(null);
  const [search, setSearch] = useState<string>();

  const { change, getValue } = useForm();
  const name = props.name as string;
  const value = getValue(name);

  useEffect(() => {
    if (!value) {
      setSearch(undefined);
    }

    if (!search && value) {
      const currentValueOption = options.find((option) => option.value === value);

      if (currentValueOption) {
        setSearch(currentValueOption?.label?.toString() ?? currentValueOption?.value);
      } else {
        change(name, undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const { state, changeValue, onChange, onBlur, onFocus } = useInput(
    props.defaultValue,
    props.onChange,
    props.onFocus,
    props.onBlur,
    validate
  );

  const filterFunction = (filterOptions: AutocompleteOption[], searchValue: string | undefined) =>
    filterOptions.filter(
      (option) =>
        !searchValue ||
        option.label?.toString().toLowerCase().startsWith(searchValue.toLowerCase()) ||
        option.value?.toString().toLowerCase().startsWith(searchValue.toLowerCase())
    );

  const filteredOptions = filterFunction(options, search);

  const closeDropdownOptions = () => {
    animationRef.current?.gotoInitialState();
  };

  const handleClickOutsideEvent = useCallback((event: MouseEvent) => {
    const isClickInside = inputWrapperRef.current?.contains(event.target as Node);

    if (!isClickInside) {
      closeDropdownOptions();
      document.removeEventListener('click', handleClickOutsideEvent);
    }
  }, []);

  const closeDropdownOptionsAndClearEvent = () => {
    closeDropdownOptions();
    document.removeEventListener('click', handleClickOutsideEvent);
  };

  const events: {
    onChange: typeof onChange;
    onBlur: typeof onBlur;
    onFocus: typeof onFocus;
  } = {
    onChange: (event) => {
      onChange(event);
      if (event.target.value.length) {
        setSearch(event.target.value);
        change(name, parseInputValue(event.target));
      } else {
        change(name, undefined);
        setSearch(undefined);
      }
    },
    onBlur,
    onFocus: (event) => {
      onFocus(event);
      animationRef.current?.gotoFinalState();
      document.addEventListener('click', handleClickOutsideEvent);
    },
  };

  const clear = () => {
    setSearch(undefined);
    change(name, undefined);
    props.onOptionChange && props.onOptionChange();
  };

  const handleOnOptionClick = (option: AutocompleteOption) => {
    change(name, option.value);
    changeValue(option.value);
    setSearch(option.label?.toString() ?? option.value);
    closeDropdownOptionsAndClearEvent();
    props.onOptionChange && props.onOptionChange(option);
  };

  const rightContainerProps = {
    state,
    rightContainer,
    clearButton,
    validate: !!validate,
    size: props.size,
    onClear: clear,
    value: search?.toString(),
  };

  return (
    <StyledContainer fullwidth={fullwidth}>
      <StyledFormFieldContainer ref={inputWrapperRef} label={label} size={props.size}>
        <StyledInput
          {...props}
          {...events}
          value={search ?? ''}
          autoComplete="off"
          rightcontainerwidth={rightContainerRef.current?.offsetWidth}
          ref={inputRef}
        />
        <Transition
          ref={animationRef}
          duration="100ms"
          transition={{
            initial: css`
              opacity: 0;
              overflow: hidden;
              max-height: 0;
            `,
            final: css`
              opacity: 1;
              overflow: scroll;
              max-height: 230px;
            `,
          }}
        >
          {!!filteredOptions.length && (
            <StyledOptionsWrapper>
              {filteredOptions.map((option) => (
                <StyledOption
                  key={option.value}
                  size={props.size}
                  onClick={() => handleOnOptionClick(option)}
                  includeLabel={!!label}
                >
                  {option.label ?? option.value}
                </StyledOption>
              ))}
            </StyledOptionsWrapper>
          )}
        </Transition>
        <FormFieldRightContainer ref={rightContainerRef} {...rightContainerProps} />
      </StyledFormFieldContainer>
      {!state.valid && <div>{state.error}</div>}
    </StyledContainer>
  );
};

export default Autocomplete;
