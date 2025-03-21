'use client';
import { Entry } from '@/app/interfaces/entry';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../components/ConfirmationModal';
import EditModal from '../../components/EditModal';
import EntryCard from '../../components/EntryCard';
import { useAuthStore } from '../../store/useAuthStore';
import useEntryStore from '../../store/useEntryStore';

export default function MyTrips() {
  const { user, loading } = useAuthStore();
  const { entries, fetchEntries, deleteEntry, updateEntry } = useEntryStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState<Entry | null>(null);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);

  const router = useRouter();

  const handleEditClick = (entry: Entry) => {
    setEntryToEdit(entry);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (updatedEntry: Entry) => {
    if (entryToEdit) {
      updateEntry(entryToEdit.id, updatedEntry);
      setIsEditModalOpen(false);
      toast.success('Entry updated successfully');
    }
  };

  const handleDeleteClick = (entryId: string) => {
    setEntryToDelete(entryId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (entryToDelete) {
      deleteEntry(entryToDelete);
      setEntryToDelete(null);
      toast.success('Entry deleted successfully');
    }
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setEntryToDelete(null);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      fetchEntries(user.uid);
    }
  }, [user, fetchEntries]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  return (
    <div className='w-full flex flex-col gap-2'>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        message='Are you sure you want to delete this entry?'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      {entryToEdit && (
        <EditModal
          isOpen={isEditModalOpen}
          entry={entryToEdit}
          onSubmit={handleEditSubmit}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {entries.length === 0 ? (
        <div className='text-white/80 px-4 py-6 border border-white/20 border-dashed rounded-md max-w-xl text-center my-10 mb-20'>
          No trips added yet. Start by adding a new trip.
        </div>
      ) : (
        <>
          <div className='flex mb-4 text-base font-bold text-white bg-[#2C1735] p-2 rounded-md'>
            <div className='w-1/2 items-start'>
              <p>
                Trips <span className='text-white/80'> ({entries.length})</span>
              </p>
            </div>
            <div className='hidden sm:flex sm:items-start w-1/2'>
              <p>Date</p>
            </div>
          </div>
          {/* Scrollable List */}
          <div className='max-h-[650px] overflow-y-auto rounded-md bg-black/10 '>
            {entries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onDelete={() => handleDeleteClick(entry.id)}
                onEdit={() => handleEditClick(entry)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
