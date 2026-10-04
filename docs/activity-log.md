# Activity Log

## 2026-10-04 - OSAFA content update

Source: `temp_docs/WEB CONTENT_OSAFA.xlsx` (OSAFA and ADDITIONAL SECTIONS tabs).

- `src/data/student-services.json`: renamed office to Office of Student Affairs and Financial Aid (navLabel OSAFA), new tagline and Purpose, replaced Responsibility/Authority/Inter-Relationships/Standards/Physical Facilities with Our Services, Scholarships and Grants, OSAFA Staff, Contact Us.
- `src/data/student-services.ts`: added optional `sections` to `OfficeItem`.
- `student-service-affairs.tsx`: renders `item.sections` inside the accordion.
- `nav-data.ts`: label OSAFA, fixed missing leading slash in the href.

Pending:
- Scholarships e-brochure download (file not yet available; sheet had a placeholder).
- `admissions.json` still references a "Student Affairs Office" with `sao@auf.edu.ph`; confirm if it should become OSAFA / `osafa@auf.edu.ph`.
