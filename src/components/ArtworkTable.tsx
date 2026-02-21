import React, { useEffect, useState, useRef } from "react";
import { DataTable, type DataTableStateEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { fetchArtworks } from "../api";
import type { Artwork } from "../types";

// 12 felt like a decent default for now  later will change if needed-->
const PAGE_SIZE = 12;

const ArtworkTable: React.FC = () => {
  // Maintaing the   data
  const [items, setItems] = useState<Artwork[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  // pagination state maintained   (1-based because API expects that) -->
  const [currentPage, setCurrentPage] = useState(1);

  // selection state (persist across pages) -->
  const [selectedIdSet, setSelectedIdSet] = useState<Set<number>>(new Set());
  const [customSelectInput, setCustomSelectInput] = useState("");

  const overlayPanelRef = useRef<OverlayPanel>(null);

  // Fetching the  data from API ----->
  const loadArtworks = async (pageNumber: number) => {
    setIsLoading(true);

    try {
      const response = await fetchArtworks(pageNumber, PAGE_SIZE);

      const data = response?.data ? response.data : [];
      setItems(data);

      setTotalCount(response?.pagination?.total || 0);
    } catch (err) {
      console.error("Error loading artworks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // load whenever page changes decpendicies
  useEffect(() => {
    loadArtworks(currentPage);

  }, [currentPage]);


  const handlePageChange = (event: DataTableStateEvent) => {
    // PrimeReact gives 0-based page index, API wants 1-based.
    const nextPage = (event.page ?? 0) + 1;
    setCurrentPage(nextPage);
  };

  // Selection logic written
  const handleSelectionChange = (e: { value: Artwork[] }) => {
    const visibleIds = items.map((art) => art.id);

    const updatedSet = new Set(selectedIdSet);

    for (let i = 0; i < visibleIds.length; i++) {
      updatedSet.delete(visibleIds[i]);
    }

    e.value.forEach((row) => {
      updatedSet.add(row.id);
    });

    setSelectedIdSet(updatedSet);
  };

  // derive selected rows for current page only
  const selectedRowsForPage = items.filter((art) =>
    selectedIdSet.has(art.id)
  );

  // Custom selection (top N rows) user input selection
  const applyCustomSelection = () => {
    const parsed = parseInt(customSelectInput);

    if (isNaN(parsed) || parsed <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }

    const limit = parsed > items.length ? items.length : parsed;

    const newSelection = new Set(selectedIdSet);

    for (let i = 0; i < limit; i++) {
      newSelection.add(items[i].id);
    }

    setSelectedIdSet(newSelection);

    if (overlayPanelRef.current) {
      overlayPanelRef.current.hide();
    }

    setCustomSelectInput("");
  };

  // Showing X to Y of Z entries
  const startEntry =
    totalCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;

  const endEntry = Math.min(
    currentPage * PAGE_SIZE,
    totalCount
  );

  return (
    <div className="card">
      <div style={{ marginBottom: 10 }}>
        <Button
          label="Custom Select"
          onClick={(e) => overlayPanelRef.current?.toggle(e)}
        />

        <OverlayPanel ref={overlayPanelRef}>
          <div style={{ display: "flex", gap: 10 }}>
            <InputText
              value={customSelectInput}
              onChange={(e) => setCustomSelectInput(e.target.value)}
              placeholder="Enter number"
            />
            <Button label="Apply" onClick={applyCustomSelection} />
          </div>
        </OverlayPanel>
      </div>
      <DataTable
        value={items}
        loading={isLoading}
        paginator
        rows={PAGE_SIZE}
        totalRecords={totalCount}
        lazy
        first={(currentPage - 1) * PAGE_SIZE}
        onPage={handlePageChange}
        selectionMode="multiple"
        selection={selectedRowsForPage}
        onSelectionChange={handleSelectionChange}
        dataKey="id"
        paginatorLeft={
          <div style={{
            fontSize: "14px",
            color: "#6b7280",
            fontWeight: 500
          }}>
            Showing <strong>{startEntry}</strong> to{" "}
            <strong>{endEntry}</strong> of{" "}
            <strong>{totalCount}</strong> entries
          </div>
        }
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Place Of Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>

    </div>
  );
};

export default ArtworkTable;