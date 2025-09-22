import { PlacesManager } from "./PlacesManager";

export default function Places() {
  return (
    <div className="max-w-screen-xl min-h-[80vh] w-full mx-auto center flex-col! px-4 md:px-6 pb-[6rem]">
      <PlacesManager />
    </div>
  );
}
