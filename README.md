# Smart Manufacturing Platform

A comprehensive full-stack manufacturing productivity platform built with Next.js 15, Supabase PostgreSQL, and shadcn/ui.

## Features

### 🏭 Manufacturing Modules
- **Back to Basics**: 5S Implementation, Root Cause Analysis, Kaizen & Abnormality Management
- **Productivity**: OEE, MTBF, MTTR, Downtime & Loss Analysis
- **Quality**: Yield Analysis, Defect Tracking, BOM Variance & Cost of Poor Quality
- **Resource Consumption**: Labor, Power, Fuel & Maintenance Cost Analysis
- **Delivery**: Production vs Plan, Dispatch Metrics & Freight Analysis
- **Safety**: Near Misses, PPE Compliance & Injury Tracking
- **Environment**: Emissions, Waste Management & Energy Balance
- **People & Culture**: Morale, Skills Development & Training Management

### 🔧 Technical Features
- **Real-time Data**: Live production metrics and KPI tracking
- **Interactive Dashboards**: Comprehensive reporting with charts and analytics
- **Data Input Forms**: Streamlined data entry for all manufacturing processes
- **Simulation Mode**: Model improvements and optimization scenarios
- **Master Data Management**: Plants, production lines, products, and employees
- **Row Level Security**: Secure data access with Supabase RLS

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **UI Components**: shadcn/ui, Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Hooks
- **Database**: PostgreSQL with Row Level Security

## Quick Start

### 1. Clone the Repository
\`\`\`bash
git clone <your-repo-url>
cd manufacturing-dashboard
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### 4. Set Up Database

1. In your Supabase dashboard, go to the SQL Editor
2. Run the SQL scripts in order:
   - First run `scripts/01-create-tables.sql` to create the database schema
   - Then run `scripts/02-seed-data.sql` to populate with sample data

### 5. Run the Development Server
\`\`\`bash
npm run dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

The platform uses a comprehensive PostgreSQL schema with the following main tables:

### Master Data
- `plants` - Manufacturing facilities
- `production_lines` - Production lines within plants
- `products` - Product catalog with SKUs
- `employees` - Staff and operators

### Operational Data
- `five_s_audits` - 5S audit scores and tracking
- `kaizen_ideas` - Continuous improvement suggestions
- `production_data` - Hourly production metrics
- `quality_inspections` - Quality control data
- `resource_consumption` - Cost and resource tracking
- `safety_events` - Safety incidents and near misses
- `environmental_data` - Environmental impact metrics
- `employee_feedback` - Staff satisfaction and feedback
- `training_records` - Employee training and certifications

## Key Features

### 📊 Real-time Analytics
- Live OEE calculations
- Production vs. plan tracking
- Quality yield monitoring
- Resource consumption analysis

### 📝 Data Entry
- Streamlined forms for all modules
- Validation and error handling
- Real-time data updates

### 🔍 Reporting
- Interactive charts and graphs
- Trend analysis
- Performance benchmarking
- Export capabilities

### 🎯 Simulation
- What-if scenario modeling
- ROI calculations
- Improvement impact analysis

## Project Structure

\`\`\`
├── app/
│   ├── components/
│   │   ├── modules/          # Manufacturing module components
│   │   └── sidebar.tsx       # Navigation sidebar
│   ├── page.tsx              # Main dashboard
│   └── layout.tsx            # Root layout
├── hooks/
│   └── use-manufacturing-data.ts  # Data fetching hooks
├── lib/
│   └── supabase.ts           # Supabase client and types
├── scripts/
│   ├── 01-create-tables.sql  # Database schema
│   └── 02-seed-data.sql      # Sample data
└── components/ui/            # shadcn/ui components
\`\`\`

## Environment Variables

Required environment variables:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

Optional for server-side operations:
\`\`\`env
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
\`\`\`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

The application will automatically deploy on every push to main.

### Database Migrations

When updating the database schema:

1. Create new migration files in the `scripts/` directory
2. Run them in your Supabase SQL Editor
3. Update TypeScript types in `lib/supabase.ts` if needed

## Security

The application implements Row Level Security (RLS) with Supabase:

- All tables have RLS enabled
- Policies restrict access to authenticated users
- Data is automatically filtered by user permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For questions or issues:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## License

This project is licensed under the MIT License.
