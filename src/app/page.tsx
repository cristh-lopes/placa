import PlateSearchForm from "../components/PlateSearchForm";

export default function Home() {
  return (
    <main style={{ 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh", 
      padding: "20px"
    }}>
      <PlateSearchForm />
    </main>
  );
}
