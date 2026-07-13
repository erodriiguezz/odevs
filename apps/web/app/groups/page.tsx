import GroupsClientPage from "./clientPage";
import GroupsSuspenseFallback from "@/components/GroupsSuspenseFallback";

export default function GroupsPage() {
  return  <GroupsSuspenseFallback>
            <GroupsClientPage/>
          </GroupsSuspenseFallback>;
}