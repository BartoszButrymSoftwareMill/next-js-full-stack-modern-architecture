import { Button } from "@heroui/button";

import { logout } from "@/lib/actions/user.actions";

export const LogoutButton = () => {
  return (
    <Button
      color="danger"
      variant="bordered"
      onPress={logout}
      className="w-full"
    >
      Log Out
    </Button>
  );
};
