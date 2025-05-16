import { User } from '@/types/user';
import Button from '../Button';

interface UserListItemProps {
  user: User;
  onEditACtion?: () => void;
}

const UserListItem = ({ user, onEditACtion }: UserListItemProps) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <li
      className="mt-1 pb-3 sm:pb-4 w-full hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer rounded-lg grid items-center px-3 py-4 transition-all duration-200 ease-in-out"
      onClick={onEditACtion}
    >
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 rtl:sm:space-x-reverse p-2">
        <div className="flex items-center space-x-4 rtl:space-x-reverse flex-1">
          <div className="shrink-0">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              {getInitials(user.name)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {user.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {user.email}
              {user.job && (
                <span className="text-gray-400 dark:text-gray-500">
                  {' '}
                  - {user.job}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white self-end sm:self-center">
          <Button onClick={onEditACtion} className="text-sm">
            Edit user
          </Button>
        </div>
      </div>
    </li>
  );
};

export default UserListItem;
