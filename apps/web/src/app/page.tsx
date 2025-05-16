'use client';
import { useEffect, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import { getAllUsers } from '@/connections/api';

import Button from '@/components/Button';
import UserModal from '@/components/UserModal';
import { User } from '@/types/user';
import UserListItem from '@/components/UserListItem';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersPage />
    </QueryClientProvider>
  );
}

function UsersPage() {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: userData, isLoading: isUsersLoading, refetch: refetchUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const handleOpenUserModal = (user: User | null = null) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = () => {
    refetchUsers();
  };
  
  return (
    <>
      <div className="container mx-auto  min-h-screen">
        <section className="py-8">
          <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
            <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex flex-col items-center justify-end p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                  <Button onClick={() => handleOpenUserModal()}>
                    <div className="flex items-center">
                      <svg
                        className="h-3.5 w-3.5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        />
                      </svg>
                      <span className="hidden md:inline">Add User</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-8">
          <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
            <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <ul className="">
                {isUsersLoading ? (
                  <div className="flex items-center justify-center w-full h-full p-4  divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  userData?.map((user) => (
                    <UserListItem
                      key={user.id}
                      user={user}
                      onEditACtion={() => {
                        handleOpenUserModal(user);
                      }}
                    />
                  ))
                )}
              </ul>
            </div>
          </div>
        </section>
      </div>
      <UserModal
        isOpen={userModalOpen}
        onClose={handleCloseUserModal}
        onSave={handleSaveUser}
        user={selectedUser || undefined}
      />
    </>
  );
}
