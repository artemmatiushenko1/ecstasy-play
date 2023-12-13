import {
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Listbox,
  ListboxItem,
  User,
} from '@nextui-org/react';
import classNames from 'classnames';
import {
  MdHomeFilled,
  MdEmojiEvents,
  MdSportsEsports,
  MdOutlineExpandMore,
  MdLogout,
} from 'react-icons/md';
import { useLocation, matchPath, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <MdHomeFilled />,
      title: 'Home',
      key: 'home',
      path: '/home',
      color: 'text-primary-500',
      bgColor: 'bg-primary-100',
    },
    {
      icon: <MdEmojiEvents />,
      title: 'Insights',
      key: 'insights',
      path: '/insights',
      color: 'text-amber-400',
      bgColor: 'bg-amber-100',
    },
  ];

  return (
    <div className="p-3 h-full flex flex-col rounded-tr-lg shadow-md">
      <div className="flex gap-2 items-center p-3">
        <MdSportsEsports className="text-3xl text-primary" />
        GAMES
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
              name="Jane Doe"
              description="zoey@example.com"
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
            <p className="font-semibold">zoey@example.com</p>
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
