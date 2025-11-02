import { colors } from '@/theme/theme';
import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  buttonPrimary: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 12,
    textAlign: 'center',
  },
  buttonTextPrimary: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    padding: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    backgroundColor: colors.cardBackground,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalBackground,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: colors.modalBackground,
    width: '90%',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: colors.background,
    color: colors.textPrimary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary + '33',
    marginBottom: 12,
    fontSize: 16,
  },
  funcionarioItem: {
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  funcionarioText: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 6,
  },
  editButtonText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: colors.deleteButton,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  produto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F97316',
    marginBottom: 8,
  },
  detalhes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantidade: {
    fontSize: 14,
    color: '#4B5563',
  },
  receita: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F97316',
    marginBottom: 16,
  },
});
