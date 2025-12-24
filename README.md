# Codexa

**Codexa is a protocol standard and reference implementation for agent identity, verifiable credentials, and trust-based delegation in the Amadeus ecosystem.**

## Scope Clarification

> [!IMPORTANT]
> **Codexa is a protocol standard and reference implementation.**
>
> It is **not**:
> - a consumer application
> - a SaaS product
> - a deployed production network
>
> The goal of Codexa is to define and validate foundational primitives for agent trust, credentialing, and delegation within the Amadeus ecosystem.

---

## Repository Structure

This repository contains the deliverables for the Codexa protocol:

*   [`CODEXA_PROTOCOL.md`](./CODEXA_PROTOCOL.md)  
    **Primary Deliverable**. The full architectural specification, including the Credential Schema, Delegation Logic, and Amadeus Integration mapping.

*   [`/src`](./src)  
    **Reference SDK**. A TypeScript implementation of the core protocol logic (Identity, Credentials, Verification) to validate feasibility.

*   [`/frontend`](./frontend)  
    **Showcase Website**. A protocol presentation site visualizing the Trust Gap and the Verification Lifecycle.

## How to Run

### Reference SDK (Compliance Cascade Demo)
Validate the delegation logic by running the demo scenario:
```bash
npm install
npm start
```
*Expected output: A simulation of an Orchestrator Agent issuing credentials and delegating tasks to a sub-agent.*

### Showcase Website
View the protocol presentation site: [TheCodexa Live Demo](https://gokhancey.github.io/TheCodexa/)
```bash
cd frontend
npm install
npm run dev
```

## License
MIT
