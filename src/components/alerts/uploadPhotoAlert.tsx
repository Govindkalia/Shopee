import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type UploadPhotoModalProps = {
  visible: boolean;
  onClose: () => void;
  onCamera: () => void;
  onGallery: () => void;
};

const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
  visible,
  onClose,
  onCamera,
  onGallery,
}) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Upload Photo</Text>

          <TouchableOpacity style={styles.button} onPress={onCamera}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onGallery}>
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UploadPhotoModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    backgroundColor: '#3478f6',
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#202020',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 40,
    marginBottom: 30,
    color: '#000',
  },
});
