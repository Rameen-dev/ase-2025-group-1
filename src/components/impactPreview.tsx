// Here we define the shape of the data that this component expects as props.
// This also helps TS catch errors and makes the component easier to understand.

// This is the React functional component.
// It receives totalItems as a prop from the landing oage.
export default function ImpactPreview({ totalItems, peopleSupported, }: { totalItems: number; peopleSupported: number;
}) {
    // Assumptions Sustainability logic

    // Average weight of one clothing item in KG
    // This is an estimate used for sustainability calculations
    const KG_PER_ITEM = 0.5;

    // Estimated C02 saved per KG of reused clothing.
    // This value is based on common sustainability estimates.
    const CO2_PER_KG = 3.6;

    // CALCULATIONS

    // Calculate the total Kilograms of clothing diverted from landfill.
    // Formula - Number of items X Average weight per item.
    const totalKgSaved = totalItems * KG_PER_ITEM;

    // Calculate estimated CO2 savings
    // Formula - Total KG Saved X CO2 saved per KG
    const co2Saved = totalKgSaved * CO2_PER_KG;

    // UI OUTPUT 

    return (
        // Section wrapper for the impact preview
        // - 1 Column for mobile
        // - 3 Column on medium screens and above
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
        
        {/* Impact card showing landfill diversion */}
        <ImpactCard 
        label="Clothing Diverted from Landfill"
        // toFixed(1) rounds the number to 1 decimal place
        value={`${totalKgSaved.toFixed(1)} kg`}
        />

        {/* Impact card showing social impact */}
        <ImpactCard
        label="Estimated CO2 Saved"
        value={`${co2Saved.toFixed(1)} kg`}
        />

        {/* Impact card showing social impact */}
        <ImpactCard
        label="People Supported"
        // Convert number to string because the component expects text
        value={peopleSupported.toString()}
        />
        </section>
    );
}

// This component is reusable for displaying a single impact metric
// It receives a label (Description) and a value (Number/ text)
function ImpactCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        group rounded-2xl border border-gray-200 bg-white p-8 sm:p-10 text-center
        shadow-sm transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl
        hover:bg-[#2E7D32] hover:border-[#2E7D32]
      "
    >
      {/* Label */}
      <p className="text-sm sm:text-base text-gray-500 transition-colors duration-300 group-hover:text-white/90">
        {label}
      </p>

      {/* Value */}
      <p className="text-4xl sm:text-5xl font-bold mt-3 text-black transition-colors duration-300 group-hover:text-white">
        {value}
      </p>
    </div>
  );
}
