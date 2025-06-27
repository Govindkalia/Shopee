import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  availableBrands: string[];
  availableColors: string[];
  availableSizes: string[];
  currentFilters: {
    minPrice: string;
    maxPrice: string;
    brands: string[];
    colors: string[];
    sizes: string[];
    inStockOnly: boolean;
    sortBy: 'popular' | 'newest' | 'priceLowToHigh' | 'priceHighToLow';
  };
  onApplyFilters: (filters: FilterModalProps['currentFilters']) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  availableBrands,
  availableColors,
  availableSizes,
  currentFilters,
  onApplyFilters,
}) => {
  const [selectedBrands, setSelectedBrands] = useState(currentFilters.brands);
  const [selectedColors, setSelectedColors] = useState(currentFilters.colors);
  const [selectedSizes, setSelectedSizes] = useState(currentFilters.sizes);
  const [inStockOnly, setInStockOnly] = useState(currentFilters.inStockOnly);
  const [sortBy, setSortBy] = useState(currentFilters.sortBy);
  const [priceRange, setPriceRange] = useState([
    parseFloat(currentFilters.minPrice) || 0,
    parseFloat(currentFilters.maxPrice) || 5000,
  ]);

  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setSelectedItems: (items: string[]) => void,
  ) => {
    setSelectedItems(
      selectedItems.includes(item)
        ? selectedItems.filter(i => i !== item)
        : [...selectedItems, item],
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setInStockOnly(false);
    setSortBy('popular');
    setPriceRange([0, 5000]);
  };

  const applyFilters = () => {
    onApplyFilters({
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      brands: selectedBrands,
      colors: selectedColors,
      sizes: selectedSizes,
      inStockOnly,
      sortBy,
    });
    onClose();
  };

  const colorMap: Record<string, string> = {
    Red: '#FF0000',
    Blue: '#0000FF',
    Yellow: '#FFFF00',
    Black: '#000000',
    White: '#FFFFFF',
    Orange: '#FFA500',
    Brown: '#A52A2A',
    Pink: '#FFC0CB',
    Green: '#008000',
    Grey: '#808080',
  };

  const defaultSizes: Record<string, string[]> = {
    Shoes: ['6', '7', '8', '9', '10', '11'],
    Clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    Bags: [],
    Lingerie: ['XS', 'S', 'M', 'L'],
    Watches: [],
  };

  const category = 'Shoes'; // Replace with dynamic category if needed
  const availableSizesWithFallback =
    availableSizes.length > 0 ? availableSizes : defaultSizes[category];

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Price Range</Text>
        <View style={styles.sliderLabels}>
          <Text>${priceRange[0].toFixed(2)}</Text>
          <Text>${priceRange[1].toFixed(2)}</Text>
        </View>

        <MultiSlider
          values={priceRange}
          sliderLength={280}
          onValuesChange={setPriceRange}
          min={0}
          max={5000}
          step={1}
          selectedStyle={{backgroundColor: '#316bff'}}
          unselectedStyle={{backgroundColor: '#E6EEFF'}}
          containerStyle={{marginBottom: 20, marginLeft: 30}}
          markerStyle={{
            backgroundColor: '#316bff',
            height: 24,
            width: 24,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 2,
          }}
          trackStyle={{height: 5, borderRadius: 4}}
        />

        <View style={styles.sortContainer}>
          {['popular', 'newest', 'priceLowToHigh', 'priceHighToLow'].map(
            option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.sortOption,
                  sortBy === option && styles.sortOptionSelected,
                ]}
                onPress={() =>
                  setSortBy(
                    option as FilterModalProps['currentFilters']['sortBy'],
                  )
                }>
                <Ionicons
                  name={
                    sortBy === option ? 'radio-button-on' : 'radio-button-off'
                  }
                  size={20}
                  color={sortBy === option ? '#0056FF' : '#ccc'}
                  style={{marginRight: 8}}
                />
                <Text
                  style={[
                    styles.sortLabel,
                    sortBy === option && styles.sortLabelSelected,
                  ]}>
                  {
                    {
                      popular: 'Popular',
                      newest: 'Newest',
                      priceLowToHigh: 'Price Low to High',
                      priceHighToLow: 'Price High to Low',
                    }[option]
                  }
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        <Text style={styles.label}>Brands</Text>
        <View style={styles.pillContainer}>
          {availableBrands.map((brand, index) => {
            const selected = selectedBrands.includes(brand);
            return (
              <TouchableOpacity
                key={`${brand}-${index}`}
                style={[styles.pill, selected && styles.pillSelected]}
                onPress={() =>
                  toggleSelection(brand, selectedBrands, setSelectedBrands)
                }>
                <Text
                  style={[
                    styles.pillText,
                    selected && styles.pillTextSelected,
                  ]}>
                  {brand}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Colors</Text>
        <View style={styles.colorContainer}>
          {availableColors.map((color, index) => {
            const selected = selectedColors.includes(color);
            return (
              <TouchableOpacity
                key={`${color}-${index}`}
                style={[
                  styles.colorCircle,
                  {backgroundColor: colorMap[color] || '#ccc'},
                  selected && styles.colorSelected,
                ]}
                onPress={() =>
                  toggleSelection(color, selectedColors, setSelectedColors)
                }
              />
            );
          })}
        </View>

        <Text style={styles.label}>Sizes</Text>
        <View style={styles.pillContainer}>
          {availableSizesWithFallback.map((size, index) => {
            const selected = selectedSizes.includes(size);
            return (
              <TouchableOpacity
                key={`${size}-${index}`}
                style={[styles.pill, selected && styles.pillSelected]}
                onPress={() =>
                  toggleSelection(size, selectedSizes, setSelectedSizes)
                }>
                <Text
                  style={[
                    styles.pillText,
                    selected && styles.pillTextSelected,
                  ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.inStockContainer}>
          <Text style={styles.label}>In Stock Only</Text>
          <Switch
            value={inStockOnly}
            onValueChange={setInStockOnly}
            trackColor={{false: '#E6EEFF', true: '#316bff'}}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {fontSize: 24, fontWeight: 'bold'},
  label: {fontSize: 18, fontWeight: 'bold', marginVertical: 12},
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioLabel: {fontSize: 16},
  pillContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F7FF',
    alignSelf: 'flex-start',
    borderRadius: 20,
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    // marginBottom: 10,
  },

  pillSelected: {
    backgroundColor: '#FFFFFF', // White background for selected
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },

  pillText: {
    fontSize: 16,
    color: '#A3B4FF', // Light blue text
  },

  pillTextSelected: {
    color: '#316bff', // Dark blue text
    fontWeight: '600',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },

  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff', // White margin around the circle
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // For Android shadow
  },

  colorSelected: {
    borderColor: '#316bff', // Blue border for selected
  },
  inStockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 10,
  },
  clearButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#316bff',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  clearButtonText: {
    color: '#316bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  applyButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#316bff',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  sortContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 10,
  },

  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF', // Default background
  },

  sortOptionSelected: {
    backgroundColor: '#E6EEFF', // Light blue background for selected
  },

  sortLabel: {
    fontSize: 16,
    color: '#333',
  },

  sortLabelSelected: {
    color: '#316bff', // Blue text for selected
    fontWeight: '600',
  },
});

export default FilterModal;
