import Dashboard from '@/pages/Dashboard.vue'
import Analytics from '@/pages/Analytics.vue'
import Fintech from '@/pages/Fintech.vue'
import Customers from '@/pages/ecommerce/Customers.vue'
import Orders from '@/pages/ecommerce/Orders.vue'
import Invoices from '@/pages/ecommerce/Invoices.vue'
import Shop from '@/pages/ecommerce/Shop.vue'
import Shop2 from '@/pages/ecommerce/Shop2.vue'
import Product from '@/pages/ecommerce/Product.vue'
import Cart from '@/pages/ecommerce/Cart.vue'
import Cart2 from '@/pages/ecommerce/Cart2.vue'
import Cart3 from '@/pages/ecommerce/Cart3.vue'
import Pay from '@/pages/ecommerce/Pay.vue'
import Campaigns from '@/pages/Campaigns.vue'
import UsersTabs from '@/pages/community/UsersTabs.vue'
import UsersTiles from '@/pages/community/UsersTiles.vue'
import Profile from '@/pages/community/Profile.vue'
import Feed from '@/pages/community/Feed.vue'
import Forum from '@/pages/community/Forum.vue'
import ForumPost from '@/pages/community/ForumPost.vue'
import Meetups from '@/pages/community/Meetups.vue'
import MeetupsPost from '@/pages/community/MeetupsPost.vue'
import CreditCards from '@/pages/finance/CreditCards.vue'
import Transactions from '@/pages/finance/Transactions.vue'
import TransactionDetails from '@/pages/finance/TransactionDetails.vue'
import JobListing from '@/pages/job/JobListing.vue'
import JobPost from '@/pages/job/JobPost.vue'
import CompanyProfile from '@/pages/job/CompanyProfile.vue'
import Messages from '@/pages/Messages.vue'
import TasksKanban from '@/pages/tasks/TasksKanban.vue'
import TasksList from '@/pages/tasks/TasksList.vue'
import Inbox from '@/pages/Inbox.vue'
import Calendar from '@/pages/Calendar.vue'
import Account from '@/pages/settings/Account.vue'
import ChangePassword from '@/pages/settings/ChangePassword.vue'
import Changelog from '@/pages/utility/Changelog.vue'
import Roadmap from '@/pages/utility/Roadmap.vue'
import Faqs from '@/pages/utility/Faqs.vue'
import EmptyState from '@/pages/utility/EmptyState.vue'
import PageNotFound from '@/pages/utility/PageNotFound.vue'
import KnowledgeBase from '@/pages/utility/KnowledgeBase.vue'
import Signin from '@/pages/Signin.vue'
import Signup from '@/pages/Signup.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import ResetPassword from '@/pages/ResetPassword.vue'
import Onboarding01 from '@/pages/Onboarding01.vue'
import Onboarding02 from '@/pages/Onboarding02.vue'
import Onboarding03 from '@/pages/Onboarding03.vue'
import Onboarding04 from '@/pages/Onboarding04.vue'
import ButtonPage from '@/pages/component/ButtonPage.vue'
import FormPage from '@/pages/component/FormPage.vue'
import DropdownPage from '@/pages/component/DropdownPage.vue'
import AlertPage from '@/pages/component/AlertPage.vue'
import ModalPage from '@/pages/component/ModalPage.vue'
import PaginationPage from '@/pages/component/PaginationPage.vue'
import TabsPage from '@/pages/component/TabsPage.vue'
import BreadcrumbPage from '@/pages/component/BreadcrumbPage.vue'
import BadgePage from '@/pages/component/BadgePage.vue'
import AvatarPage from '@/pages/component/AvatarPage.vue'
import TooltipPage from '@/pages/component/TooltipPage.vue'
import AccordionPage from '@/pages/component/AccordionPage.vue'
import IconsPage from '@/pages/component/IconsPage.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  // {
  //   path: '/dashboard/analytics',
  //   component: Analytics
  // },
  // {
  //   path: '/dashboard/fintech',
  //   component: Fintech
  // },

  // Customer orders
  {
    path: '/sales/customer-orders',
    name: 'customer-orders.list',
    component: () => import("@/pages/sales/customer_orders/ListCustomerOrder.vue")
  },
  {
    path: '/sales/customer-orders/edit/:id',
    name: 'customer-orders.edit',
    component: () => import("@/pages/sales/customer_orders/EditCustomerOrder.vue")
  },

  // Customers
  {
    path: '/sales/customers',
    name: 'customers.list',
    component: () => import("@/pages/sales/customers/ListCustomer.vue")
  },
  {
    path: '/sales/customer/get/:id',
    name: 'customers.get',
    component: () => import("@/pages/sales/customers/GetCustomer.vue")
  },

  // Products
  {
    path: '/inventory/products',
    name: 'products.list',
    component: () => import("@/pages/inventory/products/Products.vue")
  },
  {
    path: '/inventory/products/create',
    name: 'products.create',
    component: () => import("@/pages/inventory/products/CreateProduct.vue")
  },
  {
    path: '/inventory/products/edit/:id',
    name: 'products.edit',
    component: () => import("@/pages/inventory/products/EditProduct.vue")
  },

  // Prices
  {
    path: '/inventory/prices/product/:id',
    name: 'prices.list',
    component: () => import("@/pages/inventory/prices/ListPriceByProduct.vue")
  },

  // Supplier orders
  {
    path: '/inventory/supplier-orders',
    name: 'supplier-orders.list',
    component: () => import("@/pages/inventory/supplier_orders/ListSupplierOrder.vue")
  },
  {
    path: '/inventory/supplier-orders/create',
    name: 'supplier-orders.create',
    component: () => import("@/pages/inventory/supplier_orders/CreateSupplierOrder.vue")
  },
  {
    path: '/inventory/supplier-orders/edit/:id',
    name: 'supplier-orders.edit',
    component: () => import("@/pages/inventory/supplier_orders/EditSupplierOrder.vue")
  },

  // Import forms
  {
    path: '/inventory/import-forms',
    name: 'import-forms.list',
    component: () => import("@/pages/inventory/import_forms/ListImportForm.vue")
  },
  {
    path: '/inventory/import-forms/get/:id',
    name: 'import-forms.get',
    component: () => import("@/pages/inventory/import_forms/GetImportForm.vue")
  },

  // Employees
  {
    path: '/management/employees',
    name: 'employees.list',
    component: () => import("@/pages/management/employees/ListEmployee.vue")
  },
  {
    path: '/management/employees/create',
    name: 'employees.create',
    component: () => import("@/pages/management/employees/CreateEmployee.vue")
  },
  {
    path: '/management/employees/edit/:id',
    name: 'employees.edit',
    component: () => import("@/pages/management/employees/EditEmployee.vue")
  },


  {
    path: '/ecommerce/customers',
    component: Customers
  },
  {
    path: '/ecommerce/orders',
    component: Orders
  },
  {
    path: '/ecommerce/invoices',
    component: Invoices
  },
  {
    path: '/ecommerce/shop',
    component: Shop
  },
  {
    path: '/ecommerce/shop-2',
    component: Shop2
  },
  {
    path: '/ecommerce/product',
    component: Product
  },
  {
    path: '/ecommerce/cart',
    component: Cart
  },
  {
    path: '/ecommerce/cart-2',
    component: Cart2
  },
  {
    path: '/ecommerce/cart-3',
    component: Cart3
  },
  {
    path: '/ecommerce/pay',
    component: Pay
  },
  {
    path: '/campaigns',
    component: Campaigns
  },
  {
    path: '/community/users-tabs',
    component: UsersTabs
  },
  {
    path: '/community/users-tiles',
    component: UsersTiles
  },
  {
    path: '/community/profile',
    component: Profile
  },
  {
    path: '/community/feed',
    component: Feed
  },
  {
    path: '/community/forum',
    component: Forum
  },
  {
    path: '/community/forum-post',
    component: ForumPost
  },
  {
    path: '/community/meetups',
    component: Meetups
  },
  {
    path: '/community/meetups-post',
    component: MeetupsPost
  },
  {
    path: '/finance/cards',
    component: CreditCards
  },
  {
    path: '/finance/transactions',
    component: Transactions
  },
  {
    path: '/finance/transaction-details',
    component: TransactionDetails
  },
  {
    path: '/job/job-listing',
    component: JobListing
  },
  {
    path: '/job/job-post',
    component: JobPost
  },
  {
    path: '/job/company-profile',
    component: CompanyProfile
  },
  {
    path: '/messages',
    component: Messages
  },
  {
    path: '/tasks/kanban',
    component: TasksKanban
  },
  {
    path: '/tasks/list',
    component: TasksList
  },
  {
    path: '/inbox',
    component: Inbox
  },
  {
    path: '/calendar',
    component: Calendar
  },
  {
    path: '/settings/account',
    component: Account
  },
  {
    path: '/settings/change-password',
    component: ChangePassword
  },
  {
    path: '/utility/changelog',
    component: Changelog
  },
  {
    path: '/utility/roadmap',
    component: Roadmap
  },
  {
    path: '/utility/faqs',
    component: Faqs
  },
  {
    path: '/utility/empty-state',
    component: EmptyState
  },
  {
    path: '/utility/404',
    component: PageNotFound
  },
  {
    path: '/utility/knowledge-base',
    component: KnowledgeBase
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/reset-password',
    name: 'forgot',
    component: ForgotPassword
  },
  {
    path: '/reset-password/:token',
    name: 'reset',
    component: ResetPassword
  },
  {
    path: '/onboarding-01',
    component: Onboarding01
  },
  {
    path: '/onboarding-02',
    component: Onboarding02
  },
  {
    path: '/onboarding-03',
    component: Onboarding03
  },
  {
    path: '/onboarding-04',
    component: Onboarding04
  },
  {
    path: '/component/button',
    component: ButtonPage
  },
  {
    path: '/component/form',
    component: FormPage
  },
  {
    path: '/component/dropdown',
    component: DropdownPage
  },
  {
    path: '/component/alert',
    component: AlertPage
  },
  {
    path: '/component/modal',
    component: ModalPage
  },
  {
    path: '/component/pagination',
    component: PaginationPage
  },
  {
    path: '/component/tabs',
    component: TabsPage
  },
  {
    path: '/component/breadcrumb',
    component: BreadcrumbPage
  },
  {
    path: '/component/badge',
    component: BadgePage
  },
  {
    path: '/component/avatar',
    component: AvatarPage
  },
  {
    path: '/component/tooltip',
    component: TooltipPage
  },
  {
    path: '/component/accordion',
    component: AccordionPage
  },
  {
    path: '/component/icons',
    component: IconsPage
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound
  }
]

export default routes;
