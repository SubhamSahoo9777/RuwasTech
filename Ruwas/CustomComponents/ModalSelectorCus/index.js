import React from 'react';
import { Entypo } from '@expo/vector-icons';
import ModalSelector from 'react-native-modal-selector-searchable';
import styles from './style';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Button, Overlay } from 'react-native-elements';

const ModalSelectorCus = ({ data, initValue, onChange, mySearch, value, myBorder, myText, myIcon }) => {

  const handleChange = React.useCallback((option) => {
    onChange(option.label);
  }, [onChange]);

  const sortedData = React.useMemo(
    () => data.slice().sort((a, b) => a.label.localeCompare(b.label)),
    [data]
  );

  const modalData = React.useMemo(
    () => sortedData.map((region, index) => ({ key: index, label: region.label })),
    [sortedData]
  );

  const lable = initValue?.replace('*', '');

  return (

    <ModalSelector
      data={modalData}
      initValue={initValue}
      initValueTextStyle={{ color: 'black' }}
      selectStyle={{ borderColor: 'black' }}
      selectTextStyle={{ color: 'green' }}
      onChange={handleChange}
      searchText={'Search for ' + lable + '...'}
      animationType="fade"
      scrollViewAccessibilityLabel={'Scrollable options'}
      cancelButtonAccessibilityLabel={'Cancel Button'}
      style={myBorder ? styles.border : styles.dropdownContainer}
      optionTextStyle={styles.dropdownOptionText}
      cancelStyle={styles.dropdownCancel}
      cancelTextStyle={styles.dropdownCancelText}
      searchStyle={styles.searchInput}
      searchTextStyle={styles.searchTextStyle}
      search={modalData.length > 5 ? true : fa}
      optionContainerStyle={styles.optionContainerStyle}
      optionStyle={styles.optionStyle}

    >
      <FloatingLabelInput
        value={value}
        placeholder={initValue}
        editable={false}
        label={initValue}
        containerStyles={styles.input}
        inputStyles={{ color: '#2b0847', fontWeight: '500' }}
        labelStyles={{ fontWeight: 'bold' }}
        rightComponent={<Entypo name="chevron-down" size={20} color="#888" />}
      />
    </ModalSelector>
  )
}

export default React.memo(ModalSelectorCus);
