import GroupsSuspenseFallback from "@/components/GroupsSuspenseFallback";
import GroupsSectionClient from "./groupsSectionClient";

export default () => {
  return  <GroupsSuspenseFallback>
            <GroupsSectionClient />
          </GroupsSuspenseFallback>
}