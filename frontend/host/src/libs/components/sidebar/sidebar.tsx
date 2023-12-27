import {
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Listbox,
  ListboxItem,
  User,
} from '@nextui-org/react';
import classNames from 'classnames';
import {
  MdHomeFilled,
  MdEmojiEvents,
  MdOutlineExpandMore,
  MdLogout,
} from 'react-icons/md';
import { useLocation, matchPath, useNavigate } from 'react-router-dom';
import logoImg from '@/assets/logo.png';
import { AppRoute } from '@/libs/enums/enums.js';
import { useProfileStore } from '@/stores/profile/profile';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useProfileStore((state) => state.user);

  const menuItems = [
    {
      icon: <MdHomeFilled />,
      title: 'Home',
      key: 'home',
      path: AppRoute.HOME,
      color: 'text-primary-300',
      bgColor: 'bg-primary-50',
    },
    {
      icon: <MdEmojiEvents />,
      title: 'Insights',
      key: 'insights',
      path: AppRoute.INSIGHTS,
      color: 'text-amber-400',
      bgColor: 'bg-amber-100',
    },
  ];

  return (
    <div className="p-3 h-full flex flex-col rounded-tr-lg shadow-md">
      <div className="flex gap-2 items-center p-3">
        <Image src={logoImg} />
      </div>
      <Divider />
      <Listbox variant="flat" classNames={{ 'base': 'flex-1' }}>
        {menuItems.map((item) => {
          const isActive = Boolean(matchPath(item.path, location.pathname));

          return (
            <ListboxItem
              key={item.title}
              onClick={() => navigate(item.path)}
              startContent={
                <div
                  className={classNames(
                    item.color,
                    'w-[30px] h-[30px] flex justify-center items-center rounded-md',
                    isActive && item.bgColor,
                  )}
                >
                  {item.icon}
                </div>
              }
              classNames={{
                'base': 'text-2xl',
                'title': classNames(
                  'text-base text-gray-500',
                  isActive && 'font-medium',
                ),
              }}
            >
              {item.title}
            </ListboxItem>
          );
        })}
      </Listbox>
      <Dropdown placement="bottom-end">
        <DropdownTrigger className="cursor-pointer hover:bg-default/40">
          <Chip
            variant="light"
            color="primary"
            endContent={<MdOutlineExpandMore />}
            classNames={{
              'base': 'h-auto max-w-full w-full p-2',
            }}
          >
            <User
              name={user?.name}
              description={user?.email}
              avatarProps={{
                className: 'transition-transform mr-2',
                isBordered: true,
                size: 'sm',
                color: 'primary',
                src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
              }}
            />
          </Chip>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user?.email}</p>
          </DropdownItem>
          <DropdownItem startContent={<MdLogout />} key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export { Sidebar };
