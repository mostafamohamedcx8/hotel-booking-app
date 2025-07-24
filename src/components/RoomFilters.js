import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const RoomFilters = ({ onFilterChange }) => {
  const defaultFilters = {
    roomTypes: [],
    priceRanges: [],
    sort: "",
    keyword: "",
  };
  const [filters, setFilters] = useState(defaultFilters);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;

    setFilters((prev) => {
      let updatedFilters;

      if (name === "roomType") {
        const roomTypes = checked
          ? [...prev.roomTypes, value]
          : prev.roomTypes.filter((type) => type !== value);
        updatedFilters = { ...prev, roomTypes };
      } else if (name === "priceRange") {
        const priceRanges = checked
          ? [...prev.priceRanges, value]
          : prev.priceRanges.filter((range) => range !== value);
        updatedFilters = { ...prev, priceRanges };
      } else if (name === "sort") {
        updatedFilters = { ...prev, sort: value };
      } else if (name === "keyword") {
        updatedFilters = { ...prev, keyword: value };
      } else {
        updatedFilters = prev;
      }

      // Apply filters immediately
      applyFilters(updatedFilters);
      return updatedFilters;
    });
  };

  const applyFilters = (activeFilters) => {
    const query = { limit: 100 };

    if (activeFilters.roomTypes.length > 0) {
      query.roomType = activeFilters.roomTypes.join(",");
    }

    activeFilters.priceRanges.forEach((range) => {
      const [min, max] = range.split("-").map(Number);
      if (min) query["price[gte]"] = min;
      if (max) query["price[lte]"] = max;
    });

    if (activeFilters.sort) {
      query.sort = activeFilters.sort;
    }

    if (activeFilters.keyword) {
      query.keyword = activeFilters.keyword;
    }

    console.log("Applying filters:", query);
    onFilterChange(query);
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters); // Reset to default object instead of "CLEAR"
    onFilterChange({ limit: 100 }); // Reset filters in parent
  };

  return (
    <>
      <style>
        {`
          .filter-card {
            padding: 24px;
            border: none;
            border-radius: 12px;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            transition: transform 0.2s ease-in-out;
          }
          .filter-card:hover {
            transform: translateY(-4px);
          }
          .filter-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .filter-title {
            font-weight: 700;
            font-size: 1.25rem;
            color: #1a1a1a;
            margin: 0;
          }
          .clear-btn {
            font-size: 0.9rem;
            font-weight: 600;
            color: #0052cc;
            text-decoration: none;
            padding: 4px 8px;
            transition: color 0.2s ease-in-out;
          }
          .clear-btn:hover {
            color: #003d99;
            text-decoration: underline;
          }
          .filter-section {
            margin-bottom: 24px;
          }
          .filter-section-title {
            font-weight: 600;
            font-size: 1rem;
            color: #333;
            margin-bottom: 12px;
          }
          .form-check {
            padding-left: 2rem;
            margin-bottom: 10px;
            transition: background-color 0.2s ease-in-out;
          }
          .form-check:hover {
            background-color: #f1f3f5;
            border-radius: 6px;
          }
          .form-check-input {
            margin-left: -2rem;
            cursor: pointer;
            border: 2px solid #0052cc;
          }
          .form-check-label {
            font-size: 0.95rem;
            color: #444;
            cursor: pointer;
          }
          .form-check-input:checked {
            background-color: #0052cc;
            border-color: #0052cc;
          }
          .apply-btn {
            width: 100%;
            font-weight: 600;
          }
        `}
      </style>

      <Card className="filter-card mb-3">
        <div className="filter-header">
          <h5 className="filter-title">
            <i className="bi bi-funnel me-2"></i>Filters
          </h5>
          <Button
            variant="link"
            className="clear-btn"
            onClick={handleClearFilters}
          >
            Clear
          </Button>
        </div>

        <div className="filter-section">
          <h6 className="filter-section-title">Room Type</h6>
          <Form.Check
            type="checkbox"
            name="roomType"
            value="Single Bed"
            label="Single Bed"
            className="form-check"
            checked={filters.roomTypes.includes("Single Bed")}
            onChange={handleFilterChange}
          />
          <Form.Check
            type="checkbox"
            name="roomType"
            value="Family Suite"
            label="Family Suite"
            className="form-check"
            checked={filters.roomTypes.includes("Family Suite")}
            onChange={handleFilterChange}
          />
          <Form.Check
            type="checkbox"
            name="roomType"
            value="Double Bed"
            label="Double Bed"
            className="form-check"
            checked={filters.roomTypes.includes("Double Bed")}
            onChange={handleFilterChange}
          />
          <Form.Check
            type="checkbox"
            name="roomType"
            value="Luxury Room"
            label="Luxury Room"
            className="form-check"
            checked={filters.roomTypes.includes("Luxury Room")}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-section">
          <h6 className="filter-section-title">Price Range</h6>
          <Form.Check
            type="checkbox"
            name="priceRange"
            value="100-250"
            label="$100 - $250"
            className="form-check"
            checked={filters.priceRanges.includes("100-250")}
            onChange={handleFilterChange}
          />
          <Form.Check
            type="checkbox"
            name="priceRange"
            value="250-500"
            label="$250 - $500"
            className="form-check"
            checked={filters.priceRanges.includes("250-500")}
            onChange={handleFilterChange}
          />
          <Form.Check
            type="checkbox"
            name="priceRange"
            value="500-1000"
            label="$500 - $1000"
            className="form-check"
            checked={filters.priceRanges.includes("500-1000")}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-section">
          <h6 className="filter-section-title">Sort By</h6>
          <Form.Check
            type="radio"
            name="sort"
            value="pricePerNight"
            label="Price Low to High"
            className="form-check"
            checked={filters.sort === "pricePerNight"}
            onChange={handleFilterChange}
          />
          <Form.Check
            type="radio"
            name="sort"
            value="-pricePerNight"
            label="Price High to Low"
            className="form-check"
            checked={filters.sort === "-pricePerNight"}
            onChange={handleFilterChange}
          />
          <Form.Check
            type="radio"
            name="sort"
            value="-createdAt"
            label="Newest First"
            className="form-check"
            checked={filters.sort === "-createdAt"}
            onChange={handleFilterChange}
          />
          <Form.Check
            type="radio"
            name="sort"
            value=""
            label="Default"
            className="form-check"
            checked={filters.sort === ""}
            onChange={handleFilterChange}
          />
        </div>
      </Card>
    </>
  );
};

export default RoomFilters;
