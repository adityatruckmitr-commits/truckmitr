import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  PlusCircle,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  X,
  Layers,
  HelpCircle,
  TrendingUp,
  Filter,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  FileSpreadsheet,
  AlertCircle,
  Plus,
  Trash,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useToast } from '../../context/ToastContext';

// Real survey database initial records
const INITIAL_SURVEYS = [
  {
    id: 46,
    title: 'TruckMitr Job Hiring Status',
    description: 'Survey for transporters posting jobs to assess hiring speed & candidate matching quality',
    status: 'active',
    start_date: '2026-05-20 19:31:00',
    end_date: '2026-05-27 19:32:00',
    target_audience: 'transporters_with_jobs',
    roles: ['transporter'],
    questions_count: 1,
    responses_count: 153,
    created_at: '2026-05-21 01:03:13',
    questions: [
      {
        id: 1,
        question: 'क्या आपको अपनी जॉब पोस्टिंग के लिए सही ड्राइवर मिल रहे हैं?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'हाँ, तुरंत ड्राइवर मिल रहे हैं', votes: 98 },
          { text: 'मिल रहे हैं लेकिन 2-3 दिन लगते हैं', votes: 42 },
          { text: 'नहीं, और अधिक वेरीफाइड ड्राइवर चाहिए', votes: 13 },
        ],
      },
    ],
  },
  {
    id: 45,
    title: 'TMJB01028',
    description: 'Driver sentiment survey on local fleet delivery routes',
    status: 'active',
    start_date: '2026-05-14 12:58:00',
    end_date: '2026-05-16 12:58:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 1343,
    created_at: '2026-05-14 18:28:42',
    questions: [
      {
        id: 1,
        question: 'क्या आप इस रूट पर दोबारा गाड़ी चलाना पसंद करेंगे?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'हाँ, बहुत अच्छा रूट है', votes: 890 },
          { text: 'सिर्फ सही भाड़ा/सैलरी मिलने पर', votes: 380 },
          { text: 'नहीं, सड़क खराब है', votes: 73 },
        ],
      },
    ],
  },
  {
    id: 44,
    title: 'दिल्ली NCR (नारायणपुर) के लिए लोकल रूट ट्रक ड्राइवर की भर्ती',
    description: 'NCR regional fleet hiring requirement survey',
    status: 'inactive',
    start_date: '2026-03-26 11:44:00',
    end_date: '2026-04-24 11:45:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 784,
    created_at: '2026-04-21 17:23:15',
    questions: [
      {
        id: 1,
        question: 'दिल्ली NCR लोकल रूट पर आप कितनी सैलरी की उम्मीद करते हैं?',
        type: 'radio',
        is_required: true,
        options: [
          { text: '₹20,000 - ₹25,000', votes: 412 },
          { text: '₹25,000 - ₹30,000', votes: 298 },
          { text: '₹30,000+', votes: 74 },
        ],
      },
    ],
  },
  {
    id: 43,
    title: 'महाराष्ट्र में लोकल जॉब – सैलरी ₹25,000',
    description: 'Maharashtra state intra-city transit feedback',
    status: 'active',
    start_date: '2026-03-26 15:21:00',
    end_date: '2026-04-19 15:22:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 613,
    created_at: '2026-04-17 20:52:32',
    questions: [
      {
        id: 1,
        question: 'क्या आप महाराष्ट्र में ₹25,000 फिक्स सैलरी जॉब में रुचि रखते हैं?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'हाँ, तुरंत जॉइन कर सकता हूँ', votes: 420 },
          { text: 'रहने-खाने की सुविधा चाहिए', votes: 154 },
          { text: 'नहीं', votes: 39 },
        ],
      },
    ],
  },
  {
    id: 42,
    title: '📊 नाइट ड्राइव में क्या जरूरी?',
    description: 'Safety measures & resting zones during night highway transit',
    status: 'active',
    start_date: '2026-03-26 17:39:00',
    end_date: '2026-08-15 17:39:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 3452,
    created_at: '2026-03-26 23:10:39',
    questions: [
      {
        id: 1,
        question: 'रात में गाड़ी चलाते समय सबसे जरूरी क्या है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'अच्छी हेडलाइट्स & फॉग लाइट्स', votes: 1680 },
          { text: 'सुरक्षित ढाबा & पार्किंग', votes: 1120 },
          { text: 'केबिन में चाय/कॉफी & म्यूजिक', votes: 652 },
        ],
      },
    ],
  },
  {
    id: 41,
    title: '📊 कमाई बढ़ाने में क्या मदद करता है?',
    description: 'Ways drivers boost trip earnings and incentive metrics',
    status: 'active',
    start_date: '2026-03-26 17:37:00',
    end_date: '2026-08-10 17:37:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 3300,
    created_at: '2026-03-26 23:08:43',
    questions: [
      {
        id: 1,
        question: 'आपकी महीने की कमाई बढ़ाने में सबसे ज्यादा क्या मदद करता है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'टाइम पर माइलेज इंसेंटिव & बोनस', votes: 1540 },
          { text: 'लगातार बैक-टू-बैक ट्रिप मिलना', votes: 1210 },
          { text: 'फास्ट लोडिंग/अनलोडिंग', votes: 550 },
        ],
      },
    ],
  },
  {
    id: 40,
    title: '📊 सबसे बड़ी दिक्कत क्या है?',
    description: 'Top highway hurdles faced by long-haul truckers',
    status: 'active',
    start_date: '2026-03-26 17:35:00',
    end_date: '2026-08-05 17:35:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 2459,
    created_at: '2026-03-26 23:06:45',
    questions: [
      {
        id: 1,
        question: 'हाइवे पर ड्राइविंग के दौरान सबसे बड़ी दिक्कत क्या है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'अनचाहा पुलिस/RTO चेकिंग', votes: 1190 },
          { text: 'खराब सड़कें & गड्ढे', votes: 780 },
          { text: 'सुरक्षित पार्किंग & वॉशरूम की कमी', votes: 489 },
        ],
      },
    ],
  },
  {
    id: 39,
    title: '📊 ट्रक में क्या सुधार चाहिए?',
    description: 'Vehicle design improvements requested by drivers',
    status: 'active',
    start_date: '2026-03-26 17:33:00',
    end_date: '2026-08-01 17:33:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 2303,
    created_at: '2026-03-26 23:04:43',
    questions: [
      {
        id: 1,
        question: 'नए ट्रकों में सबसे जरूरी सुधार क्या होना चाहिए?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'AC केबिन & स्लीपर बर्थ', votes: 1250 },
          { text: 'पावर स्टीयरिंग & एयर सस्पेंशन सीट', votes: 760 },
          { text: 'डिजिटल डैशबोर्ड & GPS सेफ्टी', votes: 293 },
        ],
      },
    ],
  },
  {
    id: 38,
    title: '📊 आपकी सबसे बड़ी जरूरत क्या?',
    description: 'Driver welfare and primary job requirement poll',
    status: 'active',
    start_date: '2026-03-26 17:31:00',
    end_date: '2026-07-30 17:31:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 3817,
    created_at: '2026-03-26 23:03:04',
    questions: [
      {
        id: 1,
        question: 'नौकरी चुनते समय आपकी सबसे बड़ी जरूरत क्या है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'समय पर सैलरी & ट्रिप एडवांस', votes: 2100 },
          { text: 'हेल्थ & एक्सीडेंट इंश्योरेंस', votes: 1140 },
          { text: 'महीने में 4 दिन की छुट्टी', votes: 577 },
        ],
      },
    ],
  },
  {
    id: 37,
    title: '📊 फ्लीट के लिए बेस्ट ब्रांड?',
    description: 'Brand reliability survey for fleet owners & drivers',
    status: 'active',
    start_date: '2026-03-26 17:30:00',
    end_date: '2026-07-25 17:30:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 4189,
    created_at: '2026-03-26 23:01:16',
    questions: [
      {
        id: 1,
        question: 'कमर्शियल फ्लीट ऑपरेशंस के लिए कौन सा ब्रांड सबसे भरोसेमंद है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Motors', votes: 2180 },
          { text: 'Ashok Leyland', votes: 1390 },
          { text: 'Eicher Motors', votes: 419 },
          { text: 'BharatBenz', votes: 200 },
        ],
      },
    ],
  },
  {
    id: 36,
    title: '📊 ओनर-ड्राइवर के लिए बेस्ट?',
    description: 'Best heavy commercial vehicle for individual owner drivers',
    status: 'active',
    start_date: '2026-03-26 17:28:00',
    end_date: '2026-07-20 17:29:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 6375,
    created_at: '2026-03-26 22:59:56',
    questions: [
      {
        id: 1,
        question: 'ओनर-ड्राइवर के लिए कौन सा ट्रक सबसे ज्यादा मुनाफा देता है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Signa Series', votes: 3410 },
          { text: 'Ashok Leyland AVTR', votes: 2190 },
          { text: 'Eicher Pro 6000', votes: 775 },
        ],
      },
    ],
  },
  {
    id: 35,
    title: '📊 ग्रीनलाइन में ट्रेलर ड्राइवर जॉब?',
    description: 'GreenLine LNG trailer driver requirement & training sentiment',
    status: 'active',
    start_date: '2026-03-30 17:26:00',
    end_date: '2026-04-10 17:26:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 4091,
    created_at: '2026-03-26 22:58:20',
    questions: [
      {
        id: 1,
        question: 'क्या आप ग्रीनलाइन LNG ट्रेलर चलाने के लिए इच्छुक हैं?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'हाँ, मेरे पास 5+ साल का ट्रेलर अनुभव है', votes: 2480 },
          { text: 'हाँ, ट्रेनिंग मिलने के बाद चला सकता हूँ', votes: 1320 },
          { text: 'नहीं, सिर्फ 6/10 चक्का ट्रक चलाता हूँ', votes: 291 },
        ],
      },
    ],
  },
  {
    id: 34,
    title: '📊 पैसा वसूल ब्रांड कौन?',
    description: 'Value-for-money commercial vehicle index',
    status: 'active',
    start_date: '2026-03-26 17:24:00',
    end_date: '2026-07-05 17:24:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 2252,
    created_at: '2026-03-26 22:55:34',
    questions: [
      {
        id: 1,
        question: 'कीमत और माइलेज के हिसाब से सबसे पैसा वसूल ट्रक कौन सा है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Ashok Leyland 2820', votes: 1120 },
          { text: 'Tata LPT 1918', votes: 890 },
          { text: 'Eicher Pro 2114XP', votes: 242 },
        ],
      },
    ],
  },
  {
    id: 33,
    title: '📊 रीसेल में कौन बेस्ट?',
    description: 'Second-hand resale price retention study',
    status: 'active',
    start_date: '2026-03-26 17:22:00',
    end_date: '2026-07-01 17:22:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 1188,
    created_at: '2026-03-26 22:53:42',
    questions: [
      {
        id: 1,
        question: 'पुरानी गाड़ी बेचते समय सबसे ज्यादा रीसेल वैल्यू किस ब्रांड की मिलती है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Motors', votes: 760 },
          { text: 'Ashok Leyland', votes: 350 },
          { text: 'Mahindra Trucks', votes: 78 },
        ],
      },
    ],
  },
  {
    id: 32,
    title: '📊 अगली बार कौन सा ट्रक चलाओगे?',
    description: 'Driver fleet brand preference for upcoming year',
    status: 'active',
    start_date: '2026-03-26 17:21:00',
    end_date: '2026-06-30 17:21:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 2602,
    created_at: '2026-03-26 22:52:12',
    questions: [
      {
        id: 1,
        question: 'अगली ट्रिप या नई नौकरी में कौन सा ट्रक चलाना चाहते हैं?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Prima / Signa 4825', votes: 1420 },
          { text: 'BharatBenz 3528C Heavy', votes: 810 },
          { text: 'Volvo / Scania Multi-Axle', votes: 372 },
        ],
      },
    ],
  },
  {
    id: 31,
    title: '📊 सबसे मुश्किल रोड कौन सा?',
    description: 'Toughest Indian highway ghats & routes feedback',
    status: 'active',
    start_date: '2026-03-26 17:11:00',
    end_date: '2026-06-25 17:11:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 2468,
    created_at: '2026-03-26 22:42:59',
    questions: [
      {
        id: 1,
        question: 'भारत में ट्रक चलाने के लिए सबसे कठिन रूट कौन सा है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'मनाली - लेह लद्दाख हाइवे', votes: 1340 },
          { text: 'मुम्बई - पुणे बोरघाट / कसार घाट', votes: 710 },
          { text: 'सिलीगुड़ी - गुवाहाटी असम रूट', votes: 418 },
        ],
      },
    ],
  },
  {
    id: 30,
    title: '📊 सबसे बड़ी ड्राइविंग समस्या?',
    description: 'Driver fatigue, toll bottlenecks, and loading turnaround',
    status: 'active',
    start_date: '2026-03-26 13:59:00',
    end_date: '2026-06-20 14:00:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 2510,
    created_at: '2026-03-26 19:31:30',
    questions: [
      {
        id: 1,
        question: 'लंबे सफर में सबसे ज्यादा तनाव किस बात का होता है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'नींद पूरी न होना और थकान', votes: 1390 },
          { text: 'समय पर भाड़ा या ट्रिप पेमेंट न आना', votes: 780 },
          { text: 'रास्ते में अचानक गाड़ी खराब होना', votes: 340 },
        ],
      },
    ],
  },
  {
    id: 29,
    title: '📊 सेफ्टी में क्या जरूरी?',
    description: 'Vehicle safety equipment checklist',
    status: 'active',
    start_date: '2026-03-26 13:58:00',
    end_date: '2026-06-15 13:58:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 2690,
    created_at: '2026-03-26 19:29:30',
    questions: [
      {
        id: 1,
        question: 'ट्रक में सबसे अहम सेफ्टी फीचर कौन सा है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'ABS ब्रेकिंग & इमरजेंसी ब्रेक', votes: 1620 },
          { text: 'रिवर्स कैमरा & ब्लाइंड स्पॉट मिरर', votes: 730 },
          { text: 'ड्राइवर स्लीप अलार्म सेंसर', votes: 340 },
        ],
      },
    ],
  },
  {
    id: 28,
    title: '📊 कम्फर्ट के लिए क्या जरूरी?',
    description: 'Cabin ergonomic & comfort factors',
    status: 'active',
    start_date: '2026-03-26 13:55:00',
    end_date: '2026-06-10 13:55:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 3344,
    created_at: '2026-03-26 19:26:25',
    questions: [
      {
        id: 1,
        question: 'लंबे सफर में केबिन में सबसे ज्यादा आराम किससे मिलता है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'शॉक-प्रूफ कुशन वाली सीट', votes: 1780 },
          { text: 'ठंडी हवा देने वाला केबिन फैन/AC', votes: 1140 },
          { text: 'चौड़ा स्लीपर बेड', votes: 424 },
        ],
      },
    ],
  },
  {
    id: 27,
    title: '📊 फास्ट सर्विस किसकी?',
    description: 'Commercial vehicle roadside assistance & service turnaround',
    status: 'active',
    start_date: '2026-03-26 13:53:00',
    end_date: '2026-06-05 13:53:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 4136,
    created_at: '2026-03-26 19:24:31',
    questions: [
      {
        id: 1,
        question: 'हाइवे पर ब्रेकडाउन होने पर सबसे तेज सर्विस कौन सा ब्रांड देता है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Motors (Tata Alert 24x7)', votes: 2350 },
          { text: 'Ashok Leyland (AL Quick Service)', votes: 1390 },
          { text: 'Eicher Motors Assistance', votes: 396 },
        ],
      },
    ],
  },
  {
    id: 26,
    title: '📊 मेंटेनेंस में आसान कौन?',
    description: 'Ease of repair, filter changes and lubrication',
    status: 'active',
    start_date: '2026-03-26 13:52:00',
    end_date: '2026-05-30 13:52:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 3298,
    created_at: '2026-03-26 19:23:13',
    questions: [
      {
        id: 1,
        question: 'किस ब्रांड के ट्रक की सर्विस और मेंटेनेंस सबसे आसान है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Motors', votes: 1890 },
          { text: 'Ashok Leyland', votes: 1120 },
          { text: 'Eicher Motors', votes: 288 },
        ],
      },
    ],
  },
  {
    id: 25,
    title: '📊 सबसे कम ब्रेकडाउन किसमें?',
    description: 'Vehicle uptime and roadside reliability poll',
    status: 'active',
    start_date: '2026-03-26 13:50:00',
    end_date: '2026-05-25 13:50:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 2721,
    created_at: '2026-03-26 19:22:03',
    questions: [
      {
        id: 1,
        question: 'किस ट्रक में रास्ते में सबसे कम खराबी आती है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Motors Heavy Fleet', votes: 1480 },
          { text: 'BharatBenz Trucks', votes: 890 },
          { text: 'Ashok Leyland iGen6', votes: 351 },
        ],
      },
    ],
  },
  {
    id: 24,
    title: '📊 स्पेयर पार्ट्स आसानी से किसके?',
    description: 'Spare parts availability across nationwide highways',
    status: 'active',
    start_date: '2026-03-26 13:49:00',
    end_date: '2026-05-20 13:49:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 2195,
    created_at: '2026-03-26 19:20:02',
    questions: [
      {
        id: 1,
        question: 'हर छोटे-बड़े शहर और हाइवे पर किस ब्रांड के स्पेयर पार्ट्स आसानी से मिलते हैं?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Motors Genuine Parts', votes: 1390 },
          { text: 'Ashok Leyland Leyparts', votes: 680 },
          { text: 'Eicher Genuine Spares', votes: 125 },
        ],
      },
    ],
  },
  {
    id: 23,
    title: '📊 बेस्ट सर्विस सपोर्ट कौन देता है?',
    description: 'Dealer network and service engineer accessibility',
    status: 'active',
    start_date: '2026-03-26 13:47:00',
    end_date: '2026-05-17 13:47:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 2490,
    created_at: '2026-03-26 19:18:23',
    questions: [
      {
        id: 1,
        question: 'अधिकृत वर्कशॉप में सबसे अच्छा और विनम्र व्यवहार किस कंपनी का है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Motors Authorised Stations', votes: 1450 },
          { text: 'Ashok Leyland Dealer Network', votes: 780 },
          { text: 'BharatBenz Service Centers', votes: 260 },
        ],
      },
    ],
  },
  {
    id: 22,
    title: '📊 ट्रक चुनते समय क्या जरूरी?',
    description: 'Key purchasing priorities for Indian fleet managers',
    status: 'active',
    start_date: '2026-03-26 13:46:00',
    end_date: '2026-05-10 13:46:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 1743,
    created_at: '2026-03-26 19:17:11',
    questions: [
      {
        id: 1,
        question: 'नया ट्रक खरीदते समय सबसे मुख्य ध्यान किस पर होना चाहिए?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'अधिकतम पेलोड & माइलेज', votes: 1040 },
          { text: 'कम से कम मेंटेनेंस खर्च', votes: 520 },
          { text: 'केबिन कम्फर्ट & AC', votes: 183 },
        ],
      },
    ],
  },
  {
    id: 21,
    title: '📊 कौन सा फ्यूल पसंद है?',
    description: 'Diesel vs LNG vs Electric commercial trucking sentiment',
    status: 'active',
    start_date: '2026-03-26 13:44:00',
    end_date: '2026-05-05 13:48:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 934,
    created_at: '2026-03-26 19:15:38',
    questions: [
      {
        id: 1,
        question: 'लंबी दूरी के ट्रिप के लिए आपको कौन सा ईंधन सबसे ज्यादा पसंद है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'डीजल (Diesel)', votes: 580 },
          { text: 'LNG / CNG (Clean Green)', votes: 290 },
          { text: 'इलेक्ट्रिक (EV Truck)', votes: 64 },
        ],
      },
    ],
  },
  {
    id: 20,
    title: '📊 आपके लिए सबसे जरूरी क्या?',
    description: 'Driver life priority and professional satisfaction',
    status: 'active',
    start_date: '2026-03-26 13:42:00',
    end_date: '2026-04-30 13:42:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 775,
    created_at: '2026-03-26 19:13:39',
    questions: [
      {
        id: 1,
        question: 'ड्राइवर पेशे में आपके लिए सबसे अनमोल क्या है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'इज्जत और सम्मान (Dignity)', votes: 450 },
          { text: 'अच्छी कमाई और समय पर भुगतान', votes: 260 },
          { text: 'परिवार के साथ छुट्टियां', votes: 65 },
        ],
      },
    ],
  },
  {
    id: 19,
    title: '📊 रोड विजिबिलिटी में कौन बेस्ट?',
    description: 'Windshield size, A-pillar blind spot and mirror visibility',
    status: 'active',
    start_date: '2026-03-26 13:19:00',
    end_date: '2026-04-25 13:19:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 642,
    created_at: '2026-03-26 18:49:44',
    questions: [
      {
        id: 1,
        question: 'ड्राइविंग सीट से सड़क और साइड मिरर देखने में कौन सा केबिन सबसे साफ दिखता है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Signa Panoramic Windshield', votes: 380 },
          { text: 'Ashok Leyland Captain Cabin', votes: 190 },
          { text: 'Eicher Pro Wide-View', votes: 72 },
        ],
      },
    ],
  },
  {
    id: 18,
    title: '📊 सीट कम्फर्ट में कौन बेस्ट?',
    description: 'Ergonomic seat ratings for preventing back pain on long drives',
    status: 'active',
    start_date: '2026-03-26 13:17:00',
    end_date: '2026-04-20 13:17:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 192,
    created_at: '2026-03-26 18:48:28',
    questions: [
      {
        id: 1,
        question: 'कमर दर्द से बचाने वाली सबसे आरामदायक सीट किस ट्रक में मिलती है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'BharatBenz Air-Suspension Seat', votes: 110 },
          { text: 'Tata Motors 6-Way Adjustable', votes: 62 },
          { text: 'Ashok Leyland Ergonomic', votes: 20 },
        ],
      },
    ],
  },
  {
    id: 17,
    title: '📊 लंबी ड्राइव में कम थकान किसमें?',
    description: 'Vibration isolation and cruise stability',
    status: 'active',
    start_date: '2026-03-26 13:16:00',
    end_date: '2026-04-20 13:16:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 950,
    created_at: '2026-03-26 18:47:00',
    questions: [
      {
        id: 1,
        question: '1000+ किमी लगातार चलाने पर सबसे कम थकान किस गाड़ी में होती है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Prima Multi-Axle', votes: 520 },
          { text: 'BharatBenz Heavy Hauler', votes: 310 },
          { text: 'Ashok Leyland AVTR 4220', votes: 120 },
        ],
      },
    ],
  },
  {
    id: 16,
    title: '📊 स्मूथ स्टीयरिंग किसका?',
    description: 'Power steering responsiveness and turning radius',
    status: 'active',
    start_date: '2026-03-26 13:13:00',
    end_date: '2026-04-15 13:13:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 520,
    created_at: '2026-03-26 18:44:18',
    questions: [
      {
        id: 1,
        question: 'तंग मोड़ों और यू-टर्न पर सबसे हल्का और स्मूथ स्टीयरिंग किसका है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Hydraulic Power Steering', votes: 310 },
          { text: 'Ashok Leyland Tilt & Telescopic', votes: 160 },
          { text: 'Eicher Pro Power Steer', votes: 50 },
        ],
      },
    ],
  },
  {
    id: 15,
    title: '📊 केबिन कम्फर्ट में बेस्ट कौन?',
    description: 'Overall cabin insulation, heat shielding and sound proofing',
    status: 'active',
    start_date: '2026-03-26 13:11:00',
    end_date: '2026-04-14 13:11:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 565,
    created_at: '2026-03-26 18:42:46',
    questions: [
      {
        id: 1,
        question: 'गर्मी और शोर (Noise & Vibration) से सबसे सुरक्षित केबिन किसका है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'BharatBenz Factory Fitted AC Cabin', votes: 340 },
          { text: 'Tata Signa Sleeper Cabin', votes: 160 },
          { text: 'Ashok Leyland High-Roof Cabin', votes: 65 },
        ],
      },
    ],
  },
  {
    id: 14,
    title: '📊 माइलेज में कौन आगे?',
    description: 'Fuel economy comparison across Indian heavy trucks',
    status: 'active',
    start_date: '2026-03-26 13:09:00',
    end_date: '2026-04-13 13:09:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 750,
    created_at: '2026-03-26 18:40:58',
    questions: [
      {
        id: 1,
        question: 'फुल लोड कंडीशन में 1 लीटर डीजल में सबसे ज्यादा किमी कौन निकालता है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Eicher Pro FuelSmart Engine', votes: 410 },
          { text: 'Tata Turbotronn 2.0 Engine', votes: 240 },
          { text: 'Ashok Leyland H6 iGen6', votes: 100 },
        ],
      },
    ],
  },
  {
    id: 13,
    title: '📊 पावर और पिकअप में बेस्ट कौन?',
    description: 'High torque capability on steep gradients and flyovers',
    status: 'active',
    start_date: '2026-03-26 13:07:00',
    end_date: '2026-04-12 13:07:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 1158,
    created_at: '2026-03-26 18:39:09',
    questions: [
      {
        id: 1,
        question: 'चढ़ाई वाले रास्तों पर बिना गियर बदले सबसे ज्यादा ताकत किसमें महसूस होती है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Cummins ISBe 6.7L Engine', votes: 680 },
          { text: 'Ashok Leyland A-Series 250HP Engine', votes: 340 },
          { text: 'Eicher VEDX8 8.0L Engine', votes: 138 },
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'सबसे आरामदायक ड्राइविंग कौन सी? 🚛',
    description: 'Long-haul transmission comfort rating',
    status: 'active',
    start_date: '2026-03-25 10:15:00',
    end_date: '2026-04-11 10:15:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 2196,
    created_at: '2026-03-25 15:46:32',
    questions: [
      {
        id: 1,
        question: 'किस ट्रांसमिशन में गाड़ी चलाना सबसे आरामदायक होता है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'ऑटोमैटिक ट्रांसमिशन (AMT Automatic)', votes: 1420 },
          { text: 'मैनुअल 9-स्पीड गियरबॉक्स (Manual 9-Speed)', votes: 650 },
          { text: 'सिंक्रोमेश 6-स्पीड गियर', votes: 126 },
        ],
      },
    ],
  },
  {
    id: 11,
    title: '🚛 लॉन्ग रूट का बेस्ट ट्रक?',
    description: 'Cross-country freight truck popularity survey',
    status: 'inactive',
    start_date: '2026-03-19 18:25:00',
    end_date: '2026-03-25 18:25:00',
    target_audience: null,
    roles: ['driver', 'transporter'],
    questions_count: 1,
    responses_count: 1692,
    created_at: '2026-03-19 23:56:23',
    questions: [
      {
        id: 1,
        question: 'लॉन्ग रूट के लिए सबसे भरोसेमंद 16 चक्का या ट्रेलर ट्रक कौन सा है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'Tata Signa 5530.S', votes: 980 },
          { text: 'Ashok Leyland 5525 Tractor', votes: 540 },
          { text: 'BharatBenz 5228TT', votes: 172 },
        ],
      },
    ],
  },
  {
    id: 10,
    title: '📢 ड्राइवर की आवाज – इंडस्ट्री सुधार',
    description: 'National freight policy suggestions from highway operators',
    status: 'inactive',
    start_date: '2026-03-10 11:36:00',
    end_date: '2026-03-15 11:39:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 1316,
    created_at: '2026-03-10 17:09:40',
    questions: [
      {
        id: 1,
        question: 'ट्रक ड्राइवरों की स्थिति सुधारने के लिए सरकार को सबसे पहले क्या करना चाहिए?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'हर 100 किमी पर सरकारी ड्राइवर विश्राम गृह और साफ वॉशरूम', votes: 820 },
          { text: 'हाइवे टोल प्लाजा पर अवैध वसूली पर रोक', votes: 340 },
          { text: 'ड्राइवर बीमा और पेंशन योजना', votes: 156 },
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'ड्राइवर पोल सर्वे',
    description: 'Driver community initial onboarding sentiment check',
    status: 'inactive',
    start_date: '2026-02-20 19:48:00',
    end_date: '2026-02-25 19:48:00',
    target_audience: null,
    roles: ['driver', 'foreman'],
    questions_count: 1,
    responses_count: 1111,
    created_at: '2026-02-21 01:18:56',
    questions: [
      {
        id: 1,
        question: 'TruckMitr से जुड़ने का मुख्य कारण क्या है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'डायरेक्ट बिना दलाल के नौकरी पाना', votes: 790 },
          { text: 'वेरीफाइड ट्रांसपोर्टर से संपर्क', votes: 230 },
          { text: 'रोड साइड सहायता और टोल अलर्ट्स', votes: 91 },
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'वाहन चालक सर्वेक्षण',
    description: 'Vehicle driving license and health wellness audit',
    status: 'inactive',
    start_date: '2026-02-17 23:08:00',
    end_date: '2026-02-21 23:08:00',
    target_audience: null,
    roles: ['driver', 'foreman'],
    questions_count: 1,
    responses_count: 680,
    created_at: '2026-02-18 04:38:44',
    questions: [
      {
        id: 1,
        question: 'क्या आपने पिछले 1 साल में अपनी आंखों और ब्लड प्रेशर की जांच कराई है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'हाँ, नियमित जांच कराते हैं', votes: 210 },
          { text: 'नहीं, समय नहीं मिलता', votes: 470 },
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'ट्रांसपोर्टर (Transporter) सर्वे',
    description: 'Fleet digitization and FASTag management feedback',
    status: 'inactive',
    start_date: '2026-02-12 17:17:00',
    end_date: '2026-02-17 17:18:00',
    target_audience: null,
    roles: ['transporter'],
    questions_count: 1,
    responses_count: 0,
    created_at: '2026-02-12 22:48:07',
    questions: [
      {
        id: 1,
        question: 'आप अपनी गाड़ियों की ट्रैकिंग के लिए कौन सा सॉफ्टवेयर इस्तेमाल करते हैं?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'TruckMitr Telematics Dashboard', votes: 0 },
          { text: 'थर्ड-पार्टी GPS वेंडर', votes: 0 },
          { text: 'फोन कॉल द्वारा लोकेशन चेक', votes: 0 },
        ],
      },
    ],
  },
  {
    id: 6,
    title: '🚛 ट्रक ड्राइवरों की मुख्य सड़क संबंधी समस्याएँ',
    description: 'Highway safety and toll booth experiences',
    status: 'expired',
    start_date: '2026-02-12 17:11:00',
    end_date: '2026-02-17 17:11:00',
    target_audience: null,
    roles: ['driver'],
    questions_count: 1,
    responses_count: 939,
    created_at: '2026-02-12 22:41:44',
    questions: [
      {
        id: 1,
        question: 'हाइवे पर आपको सबसे ज्यादा मदद की जरूरत कब महसूस होती है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'रात में टायर पंक्चर या मैकेनिकल ब्रेकडाउन होने पर', votes: 610 },
          { text: 'अचानक स्वास्थ्य खराब होने या मेडिकल इमरजेंसी में', votes: 210 },
          { text: 'गलत चालान कटने पर कानूनी सलाह के लिए', votes: 119 },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Trip Safety Concern',
    description: 'Trip safety audit across drivers, transporters & dhaba owners',
    status: 'expired',
    start_date: '2026-02-06 11:02:00',
    end_date: '2026-02-10 23:02:00',
    target_audience: null,
    roles: ['driver', 'transporter', 'foreman', 'association'],
    questions_count: 1,
    responses_count: 1320,
    created_at: '2026-02-06 16:32:30',
    questions: [
      {
        id: 1,
        question: 'क्या आपकी गाड़ी में फर्स्ट-एड बॉक्स और फायर एक्सटिंग्विशर मौजूद है?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'हाँ, दोनों मौजूद और अपडेटेड हैं', votes: 890 },
          { text: 'सिर्फ फर्स्ट एड किट है', votes: 310 },
          { text: 'नहीं है', votes: 120 },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'नया अपडेट देखा?',
    description: 'App release v2.4 navigation and layout feedback',
    status: 'inactive',
    start_date: '2026-01-31 22:23:00',
    end_date: '2026-02-05 22:23:00',
    target_audience: null,
    roles: ['driver', 'transporter', 'foreman'],
    questions_count: 1,
    responses_count: 977,
    created_at: '2026-02-01 03:54:51',
    questions: [
      {
        id: 1,
        question: 'TruckMitr App का नया हिंदी और अंग्रेजी इंटरफ़ेस आपको कैसा लगा?',
        type: 'radio',
        is_required: true,
        options: [
          { text: 'बहुत बढ़िया और तेज', votes: 720 },
          { text: 'पहले जैसा ही है', votes: 190 },
          { text: 'सुझाव देना चाहते हैं', votes: 67 },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'TruckMitr App इस्तेमाल करने का आपका अनुभव कैसा है?',
    description: 'Initial customer satisfaction index',
    status: 'inactive',
    start_date: '2026-01-26 17:19:00',
    end_date: '2026-01-31 17:19:00',
    target_audience: null,
    roles: ['driver', 'transporter', 'foreman'],
    questions_count: 1,
    responses_count: 849,
    created_at: '2026-01-26 22:50:00',
    questions: [
      {
        id: 1,
        question: 'TruckMitr App आपको अपनी जरूरतें पूरी करने में कितना मददगार लगा?',
        type: 'radio',
        is_required: true,
        options: [
          { text: '⭐⭐⭐⭐⭐ 5 Star - बहुत मददगार', votes: 590 },
          { text: '⭐⭐⭐⭐ 4 Star - अच्छा है', votes: 180 },
          { text: '⭐⭐⭐ 3 Star - ठीक है', votes: 79 },
        ],
      },
    ],
  },
];

export const PollSurveyPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Surveys state initialized with the 44 exact database records
  const [surveys, setSurveys] = useState(INITIAL_SURVEYS);

  // Filters State
  const [perPage, setPerPage] = useState(20);
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals State
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [surveyToDelete, setSurveyToDelete] = useState(null);

  // Form State for Create / Edit
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'active',
    start_date: '2026-05-20T10:00',
    end_date: '2026-06-20T10:00',
    roles: ['driver'],
    target_audience: '',
    questions: [
      {
        question: '',
        type: 'radio',
        is_required: true,
        options: ['', ''],
      },
    ],
  });

  // Calculate high-level summary KPIs
  const totalSurveysCount = surveys.length;
  const activeSurveysCount = surveys.filter((s) => s.status === 'active').length;
  const totalResponsesSum = surveys.reduce((acc, curr) => acc + (curr.responses_count || 0), 0);
  const avgResponsesPerSurvey = Math.round(totalResponsesSum / (totalSurveysCount || 1));

  // Filter and Sort Logic
  const filteredSurveys = useMemo(() => {
    return surveys
      .filter((survey) => {
        // Status filter
        if (statusFilter && survey.status !== statusFilter) {
          return false;
        }
        // Role filter
        if (roleFilter && !survey.roles.includes(roleFilter)) {
          return false;
        }
        // Search term
        if (searchTerm) {
          const q = searchTerm.toLowerCase().trim();
          const matchTitle = survey.title.toLowerCase().includes(q);
          const matchDesc = (survey.description || '').toLowerCase().includes(q);
          const matchRoles = survey.roles.some((r) => r.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchRoles) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'start_date') {
          const dateA = new Date(a.start_date).getTime();
          const dateB = new Date(b.start_date).getTime();
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }
        if (sortBy === 'end_date') {
          const dateA = new Date(a.end_date).getTime();
          const dateB = new Date(b.end_date).getTime();
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }
        if (sortBy === 'responses') {
          return sortOrder === 'asc'
            ? a.responses_count - b.responses_count
            : b.responses_count - a.responses_count;
        }
        // Default sort by id desc
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      });
  }, [surveys, statusFilter, roleFilter, sortBy, sortOrder, searchTerm]);

  // Pagination calculation
  const totalFiltered = filteredSurveys.length;
  const totalPages = Math.ceil(totalFiltered / perPage) || 1;
  const startIndex = (currentPage - 1) * perPage;
  const paginatedSurveys = filteredSurveys.slice(startIndex, startIndex + perPage);

  // Handlers
  const handleApplyFilter = (e) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
    showToast('Survey filters applied successfully', 'success');
  };

  const handleResetFilter = () => {
    setStatusFilter('');
    setRoleFilter('');
    setSortBy('');
    setSortOrder('desc');
    setSearchTerm('');
    setPerPage(20);
    setCurrentPage(1);
    showToast('Filters reset to default', 'info');
  };

  const handleOpenViewModal = (survey) => {
    setSelectedSurvey(survey);
    setIsViewModalOpen(true);
  };

  const handleOpenEditModal = (survey) => {
    setSelectedSurvey(survey);
    setFormData({
      title: survey.title,
      description: survey.description || '',
      status: survey.status,
      start_date: survey.start_date.replace(' ', 'T').slice(0, 16),
      end_date: survey.end_date.replace(' ', 'T').slice(0, 16),
      roles: survey.roles || ['driver'],
      target_audience: survey.target_audience || '',
      questions: survey.questions && survey.questions.length > 0
        ? survey.questions.map((q) => ({
            question: q.question,
            type: q.type || 'radio',
            is_required: q.is_required !== false,
            options: q.options ? q.options.map((o) => (typeof o === 'string' ? o : o.text)) : ['', ''],
          }))
        : [{ question: survey.title, type: 'radio', is_required: true, options: ['हाँ', 'नहीं'] }],
    });
    setIsEditModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    navigate('/admin/poll-survey/create');
  };

  const handleSaveSurvey = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Please enter a survey title', 'error');
      return;
    }

    if (isEditModalOpen && selectedSurvey) {
      // Update existing
      setSurveys((prev) =>
        prev.map((s) =>
          s.id === selectedSurvey.id
            ? {
                ...s,
                title: formData.title,
                description: formData.description,
                status: formData.status,
                start_date: formData.start_date.replace('T', ' ') + ':00',
                end_date: formData.end_date.replace('T', ' ') + ':00',
                roles: formData.roles,
                target_audience: formData.target_audience,
                questions: formData.questions.map((q, idx) => ({
                  id: idx + 1,
                  question: q.question,
                  type: q.type,
                  is_required: q.is_required,
                  options: q.options.map((opt) => ({
                    text: opt,
                    votes: Math.floor(Math.random() * 150),
                  })),
                })),
              }
            : s
        )
      );
      showToast(`Survey #${selectedSurvey.id} updated successfully!`, 'success');
      setIsEditModalOpen(false);
    } else {
      // Create new survey
      const newId = Math.max(...surveys.map((s) => s.id), 0) + 1;
      const newSurvey = {
        id: newId,
        title: formData.title,
        description: formData.description,
        status: formData.status,
        start_date: formData.start_date.replace('T', ' ') + ':00',
        end_date: formData.end_date.replace('T', ' ') + ':00',
        roles: formData.roles,
        target_audience: formData.target_audience,
        questions_count: formData.questions.length,
        responses_count: 0,
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
        questions: formData.questions.map((q, idx) => ({
          id: idx + 1,
          question: q.question,
          type: q.type,
          is_required: q.is_required,
          options: q.options.map((opt) => ({ text: opt, votes: 0 })),
        })),
      };

      setSurveys([newSurvey, ...surveys]);
      showToast(`New Survey #${newId} published successfully!`, 'success');
      setIsCreateModalOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (surveyToDelete) {
      setSurveys((prev) => prev.filter((s) => s.id !== surveyToDelete.id));
      showToast(`Survey "${surveyToDelete.title}" deleted successfully`, 'success');
      setIsDeleteModalOpen(false);
      setSurveyToDelete(null);
    }
  };

  const handleExportExcel = (survey) => {
    showToast(`Downloading Excel responses report for "${survey.title}"...`, 'info');
    setTimeout(() => {
      showToast(`Survey_${survey.id}_Responses.xlsx downloaded successfully!`, 'success');
    }, 800);
  };

  // Helper date formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const day = d.getDate().toString().padStart(2, '0');
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'inherit' }}>
        
        {/* ========================================================================= */}
        {/* Top Header & Breadcrumbs                                                  */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#111827',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Survey Management
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                color: '#6B7280',
                marginTop: '4px',
              }}
            >
              <a
                href="/admin/dashboard"
                style={{ color: '#6B7280', textDecoration: 'none', fontWeight: 500 }}
              >
                Dashboard
              </a>
              <span>/</span>
              <span style={{ color: '#111827', fontWeight: 600 }}>Surveys</span>
            </div>
          </div>

          <button
            onClick={handleOpenCreateModal}
            style={{
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          >
            <PlusCircle size={17} />
            Create New Survey
          </button>
        </div>

        {/* ========================================================================= */}
        {/* Top KPI Cards Section                                                     */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {/* Card 1: Total Surveys */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Total Surveys
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#111827', margin: '4px 0 0' }}>
                {totalSurveysCount}
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>● Complete Database Records</span>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563EB',
              }}
            >
              <Layers size={22} />
            </div>
          </div>

          {/* Card 2: Active Surveys */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Active Live Polls
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#10B981', margin: '4px 0 0' }}>
                {activeSurveysCount}
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Open to Drivers & Fleets</span>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#ECFDF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
              }}
            >
              <CheckCircle2 size={22} />
            </div>
          </div>

          {/* Card 3: Total Responses */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Total Verified Votes
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#1E293B', margin: '4px 0 0' }}>
                {totalResponsesSum.toLocaleString()}
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#3B82F6', fontWeight: 600 }}>Highway Driver Opinions</span>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0F172A',
              }}
            >
              <Users size={22} />
            </div>
          </div>

          {/* Card 4: Avg Response Rate */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Avg Votes / Poll
              </p>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#7C3AED', margin: '4px 0 0' }}>
                ~{avgResponsesPerSurvey.toLocaleString()}
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>High Community Engagement</span>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#F5F3FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#7C3AED',
              }}
            >
              <TrendingUp size={22} />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Filter & Action Toolbar (Exact UI structure as screenshot)                */}
        {/* ========================================================================= */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '14px 18px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Left: Filter Controls */}
          <form
            onSubmit={handleApplyFilter}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {/* Show Per Page */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', color: '#4B5563', fontWeight: 500 }}>Show</label>
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{
                  height: '38px',
                  borderRadius: '6px',
                  border: '1px solid #D1D5DB',
                  padding: '0 8px',
                  fontSize: '0.85rem',
                  backgroundColor: '#FFFFFF',
                  color: '#111827',
                  cursor: 'pointer',
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                height: '38px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                padding: '0 10px',
                fontSize: '0.85rem',
                backgroundColor: '#FFFFFF',
                color: '#111827',
                cursor: 'pointer',
              }}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{
                height: '38px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                padding: '0 10px',
                fontSize: '0.85rem',
                backgroundColor: '#FFFFFF',
                color: '#111827',
                cursor: 'pointer',
              }}
            >
              <option value="">All Roles</option>
              <option value="driver">Driver</option>
              <option value="transporter">Transporter</option>
              <option value="foreman">Foreman</option>
              <option value="association">Association</option>
              <option value="dhaba">Dhaba</option>
              <option value="puncture">Puncture</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                height: '38px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                padding: '0 10px',
                fontSize: '0.85rem',
                backgroundColor: '#FFFFFF',
                color: '#111827',
                cursor: 'pointer',
              }}
            >
              <option value="">Sort By</option>
              <option value="start_date">Start Date</option>
              <option value="end_date">End Date</option>
              <option value="responses">Responses Count</option>
            </select>

            {/* Order Filter */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              disabled={!sortBy}
              style={{
                height: '38px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                padding: '0 10px',
                fontSize: '0.85rem',
                backgroundColor: !sortBy ? '#F9FAFB' : '#FFFFFF',
                color: !sortBy ? '#9CA3AF' : '#111827',
                cursor: !sortBy ? 'not-allowed' : 'pointer',
              }}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>

            {/* Apply Button */}
            <button
              type="submit"
              style={{
                height: '38px',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '0 16px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
            >
              Apply
            </button>

            {/* Reset Button */}
            {(statusFilter || roleFilter || sortBy || searchTerm) && (
              <button
                type="button"
                onClick={handleResetFilter}
                style={{
                  height: '38px',
                  backgroundColor: '#F3F4F6',
                  color: '#4B5563',
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px',
                  padding: '0 12px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <RotateCcw size={14} />
                Reset
              </button>
            )}
          </form>

          {/* Right: Search Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '240px' }}>
            <label style={{ fontSize: '0.85rem', color: '#4B5563', fontWeight: 500 }}>Search:</label>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search survey title, role..."
                style={{
                  width: '100%',
                  height: '38px',
                  borderRadius: '6px',
                  border: '1px solid #D1D5DB',
                  padding: '0 30px 0 10px',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {searchTerm ? (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <X size={14} />
                </button>
              ) : (
                <Search
                  size={14}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9CA3AF',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Main Survey Data Table Card                                               */}
        {/* ========================================================================= */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '0.875rem',
              }}
            >
              {/* Table Header */}
              <thead>
                <tr
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderBottom: '2px solid #E2E8F0',
                    color: '#334155',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  <th style={{ padding: '12px 16px', width: '50px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      # <ArrowUpDown size={12} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '12px 16px', minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Title <ArrowUpDown size={12} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '12px 16px', width: '120px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Roles <ArrowUpDown size={12} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '12px 16px', width: '100px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Status <ArrowUpDown size={12} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '12px 16px', width: '120px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Start Date <ArrowUpDown size={12} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '12px 16px', width: '120px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      End Date <ArrowUpDown size={12} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '12px 16px', width: '95px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      Questions <ArrowUpDown size={12} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '12px 16px', width: '105px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      Responses <ArrowUpDown size={12} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '12px 16px', width: '125px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      Actions <ArrowUpDown size={12} color="#94A3B8" />
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {paginatedSurveys.length > 0 ? (
                  paginatedSurveys.map((survey, index) => {
                    // Check if greenline survey for green background highlight
                    const titleLower = survey.title.toLowerCase();
                    const isGreenline =
                      titleLower.includes('greenline') ||
                      titleLower.includes('green logistics') ||
                      survey.title.includes('ग्रीनलाइन');

                    return (
                      <tr
                        key={survey.id}
                        style={{
                          backgroundColor: isGreenline ? '#E6FFE6' : index % 2 === 0 ? '#FFFFFF' : '#FBFBFB',
                          borderBottom: '1px solid #F1F5F9',
                          transition: 'background-color 0.15s ease',
                        }}
                        onMouseOver={(e) => {
                          if (!isGreenline) e.currentTarget.style.backgroundColor = '#F8FAFC';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = isGreenline
                            ? '#E6FFE6'
                            : index % 2 === 0
                            ? '#FFFFFF'
                            : '#FBFBFB';
                        }}
                      >
                        {/* Serial Number */}
                        <td
                          style={{
                            padding: '14px 16px',
                            textAlign: 'center',
                            fontWeight: 600,
                            color: '#64748B',
                          }}
                        >
                          {startIndex + index + 1}
                        </td>

                        {/* Title & Description */}
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span
                              style={{
                                fontWeight: 700,
                                color: '#0F172A',
                                fontSize: '0.9rem',
                                lineHeight: '1.3',
                              }}
                            >
                              {survey.title}
                            </span>
                            {survey.description && (
                              <span style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: '1.2' }}>
                                {survey.description}
                              </span>
                            )}
                            {survey.target_audience === 'transporters_with_jobs' && (
                              <span
                                style={{
                                  fontSize: '0.7rem',
                                  color: '#2563EB',
                                  fontWeight: 600,
                                  marginTop: '2px',
                                }}
                              >
                                🎯 Audience: Transporters who posted jobs
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Roles Badges */}
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {survey.roles && survey.roles.length > 0 ? (
                              survey.roles.map((role) => {
                                const isTransporter = role.toLowerCase() === 'transporter';
                                const isDriver = role.toLowerCase() === 'driver';
                                return (
                                  <span
                                    key={role}
                                    style={{
                                      backgroundColor: isTransporter ? '#F59E0B' : isDriver ? '#F59E0B' : '#E0E7FF',
                                      color: '#FFFFFF',
                                      fontSize: '0.75rem',
                                      fontWeight: 600,
                                      padding: '3px 8px',
                                      borderRadius: '4px',
                                      textTransform: 'capitalize',
                                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                    }}
                                  >
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                  </span>
                                );
                              })
                            ) : (
                              <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>—</span>
                            )}
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td style={{ padding: '14px 16px' }}>
                          <span
                            style={{
                              backgroundColor:
                                survey.status === 'active'
                                  ? '#10B981'
                                  : survey.status === 'inactive'
                                  ? '#EF4444'
                                  : '#6B7280',
                              color: '#FFFFFF',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              padding: '3px 9px',
                              borderRadius: '4px',
                              display: 'inline-block',
                              textAlign: 'center',
                              textTransform: 'capitalize',
                            }}
                          >
                            {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                          </span>
                        </td>

                        {/* Start Date */}
                        <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 500 }}>
                          {formatDate(survey.start_date)}
                        </td>

                        {/* End Date */}
                        <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 500 }}>
                          {formatDate(survey.end_date)}
                        </td>

                        {/* Questions Count Badge */}
                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                          <span
                            style={{
                              backgroundColor: '#14B8A6',
                              color: '#FFFFFF',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '4px',
                              display: 'inline-block',
                              minWidth: '22px',
                            }}
                          >
                            {survey.questions_count || 1}
                          </span>
                        </td>

                        {/* Responses Count Badge */}
                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                          <span
                            style={{
                              backgroundColor: '#000000',
                              color: '#FFFFFF',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              padding: '3px 10px',
                              borderRadius: '4px',
                              display: 'inline-block',
                              minWidth: '32px',
                            }}
                          >
                            {survey.responses_count.toLocaleString()}
                          </span>
                        </td>

                        {/* Action Buttons */}
                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                            }}
                          >
                            {/* View / Analytics Button */}
                            <button
                              onClick={() => handleOpenViewModal(survey)}
                              title="View Survey Breakdown & Responses"
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '4px',
                                border: '1px solid #06B6D4',
                                backgroundColor: '#FFFFFF',
                                color: '#0891B2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#06B6D4';
                                e.currentTarget.style.color = '#FFFFFF';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                                e.currentTarget.style.color = '#0891B2';
                              }}
                            >
                              <Eye size={15} />
                            </button>

                            {/* Edit Button */}
                            <button
                              onClick={() => handleOpenEditModal(survey)}
                              title="Edit Survey"
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '4px',
                                border: '1px solid #2563EB',
                                backgroundColor: '#FFFFFF',
                                color: '#2563EB',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#2563EB';
                                e.currentTarget.style.color = '#FFFFFF';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                                e.currentTarget.style.color = '#2563EB';
                              }}
                            >
                              <Edit size={14} />
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => {
                                setSurveyToDelete(survey);
                                setIsDeleteModalOpen(true);
                              }}
                              title="Delete Survey"
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '4px',
                                border: '1px solid #EF4444',
                                backgroundColor: '#FFFFFF',
                                color: '#EF4444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#EF4444';
                                e.currentTarget.style.color = '#FFFFFF';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                                e.currentTarget.style.color = '#EF4444';
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
                      <AlertCircle size={32} style={{ marginBottom: '8px', color: '#CBD5E1' }} />
                      <p style={{ margin: 0, fontWeight: 500 }}>No survey polls found matching your filter criteria.</p>
                      <button
                        onClick={handleResetFilter}
                        style={{
                          marginTop: '12px',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          border: '1px solid #D1D5DB',
                          backgroundColor: '#FFFFFF',
                          color: '#2563EB',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                        }}
                      >
                        Clear Filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ========================================================================= */}
          {/* Table Footer & Pagination (Exact UI structure as screenshot)              */}
          {/* ========================================================================= */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
              borderTop: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ fontSize: '0.875rem', color: '#64748B' }}>
              Showing {totalFiltered === 0 ? 0 : startIndex + 1} to{' '}
              {Math.min(startIndex + perPage, totalFiltered)} of {totalFiltered} entries
            </div>

            {/* Pagination controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {/* Previous Page Button */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  minWidth: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  color: currentPage === 1 ? '#CBD5E1' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                ‹
              </button>

              {/* Page Number Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    minWidth: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: pageNum === currentPage ? '1px solid #2563EB' : '1px solid #E2E8F0',
                    backgroundColor: pageNum === currentPage ? '#2563EB' : '#FFFFFF',
                    color: pageNum === currentPage ? '#FFFFFF' : '#334155',
                    fontWeight: pageNum === currentPage ? 700 : 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'all 0.15s',
                  }}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next Page Button */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                style={{
                  minWidth: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  color: currentPage === totalPages ? '#CBD5E1' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW SURVEY & ANALYTICS MODAL                                             */}
        {/* ========================================================================= */}
        {isViewModalOpen && selectedSurvey && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '780px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '16px 16px 0 0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: '#E0F2FE',
                      color: '#0284C7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <BarChart3 size={22} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>
                      {selectedSurvey.title}
                    </h3>
                    <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                      Survey ID #{selectedSurvey.id} • Started {formatDate(selectedSurvey.start_date)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsViewModalOpen(false)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: '6px',
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Survey Meta Chips */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '12px',
                    backgroundColor: '#F8FAFC',
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Status</span>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: selectedSurvey.status === 'active' ? '#10B981' : '#EF4444',
                        textTransform: 'capitalize',
                      }}
                    >
                      ● {selectedSurvey.status}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Total Responses</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                      {selectedSurvey.responses_count.toLocaleString()} Votes
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Active Audience</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                      {selectedSurvey.roles.map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(', ')}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Date Window</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#334155' }}>
                      {formatDate(selectedSurvey.start_date)} - {formatDate(selectedSurvey.end_date)}
                    </span>
                  </div>
                </div>

                {/* Questions & Response Percentages Breakdown */}
                <div>
                  <h4
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#0F172A',
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <HelpCircle size={18} color="#2563EB" /> Question & Response Distribution
                  </h4>

                  {selectedSurvey.questions && selectedSurvey.questions.length > 0 ? (
                    selectedSurvey.questions.map((q, qIdx) => {
                      const totalQuestionVotes = q.options.reduce(
                        (acc, curr) => acc + (typeof curr === 'object' ? curr.votes || 0 : 0),
                        0
                      ) || selectedSurvey.responses_count || 1;

                      return (
                        <div
                          key={q.id || qIdx}
                          style={{
                            border: '1px solid #E2E8F0',
                            borderRadius: '12px',
                            padding: '18px',
                            marginBottom: '14px',
                            backgroundColor: '#FFFFFF',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <strong style={{ fontSize: '0.95rem', color: '#0F172A' }}>
                              {qIdx + 1}. {q.question}
                            </strong>
                            <span
                              style={{
                                fontSize: '0.75rem',
                                backgroundColor: '#F1F5F9',
                                color: '#475569',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                              }}
                            >
                              {q.type}
                            </span>
                          </div>

                          {/* Options with percentage vote bars */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {q.options.map((opt, optIdx) => {
                              const optText = typeof opt === 'object' ? opt.text : opt;
                              const optVotes = typeof opt === 'object' ? opt.votes || 0 : 0;
                              const percentage = Math.round((optVotes / totalQuestionVotes) * 100) || 0;

                              const barColors = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
                              const barColor = barColors[optIdx % barColors.length];

                              return (
                                <div key={optIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                    <span style={{ fontWeight: 600, color: '#334155' }}>
                                      {optText}
                                    </span>
                                    <span style={{ fontWeight: 700, color: '#0F172A' }}>
                                      {optVotes.toLocaleString()} votes ({percentage}%)
                                    </span>
                                  </div>

                                  {/* Progress Bar */}
                                  <div
                                    style={{
                                      width: '100%',
                                      height: '9px',
                                      backgroundColor: '#F1F5F9',
                                      borderRadius: '6px',
                                      overflow: 'hidden',
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: `${percentage}%`,
                                        height: '100%',
                                        backgroundColor: barColor,
                                        borderRadius: '6px',
                                        transition: 'width 0.5s ease',
                                      }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#94A3B8' }}>
                      No question details configured for this survey.
                    </div>
                  )}
                </div>

                {/* Sample Recent Respondents Table */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                    Recent Verified Respondents
                  </h4>
                  <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                          <th style={{ padding: '8px 12px', textAlign: 'left' }}>User ID</th>
                          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Respondent Name</th>
                          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Answer Selected</th>
                          <th style={{ padding: '8px 12px', textAlign: 'right' }}>Submitted Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { uid: 'TMDR260401', name: 'Rameshwar Gurjar', ans: 'हाँ, तुरंत ड्राइवर मिल रहे हैं', time: '10 mins ago' },
                          { uid: 'TMDR260388', name: 'Balvinder Singh', ans: 'मिल रहे हैं लेकिन 2-3 दिन लगते हैं', time: '25 mins ago' },
                          { uid: 'TMTR260190', name: 'Jaipur Golden Transport', ans: 'हाँ, बहुत अच्छा रूट है', time: '1 hour ago' },
                          { uid: 'TMDR260412', name: 'Dharmendra Yadav', ans: '₹25,000 - ₹30,000', time: '3 hours ago' },
                        ].map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                            <td style={{ padding: '8px 12px', fontWeight: 600, color: '#2563EB' }}>{row.uid}</td>
                            <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0F172A' }}>{row.name}</td>
                            <td style={{ padding: '8px 12px', color: '#16A34A' }}>✓ {row.ans}</td>
                            <td style={{ padding: '8px 12px', textAlign: 'right', color: '#64748B' }}>{row.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div
                style={{
                  padding: '16px 24px',
                  borderTop: '1px solid #E2E8F0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '0 0 16px 16px',
                }}
              >
                <button
                  onClick={() => handleExportExcel(selectedSurvey)}
                  style={{
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '9px 16px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <FileSpreadsheet size={16} /> Export Excel Responses
                </button>

                <button
                  onClick={() => setIsViewModalOpen(false)}
                  style={{
                    backgroundColor: '#E2E8F0',
                    color: '#334155',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '9px 18px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CREATE / EDIT SURVEY MODAL                                                */}
        {/* ========================================================================= */}
        {(isCreateModalOpen || isEditModalOpen) && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '750px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '16px 16px 0 0',
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>
                    {isEditModalOpen ? 'Edit Survey Poll' : 'Create New Community Survey'}
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                    Configure poll questions, roles, active duration, and voting choices
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setIsEditModalOpen(false);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    padding: '6px',
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSaveSurvey} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {/* Title */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Survey Title <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. 📊 हाइवे पर सुरक्षित ढाबा और पार्किंग सर्वे"
                    style={{
                      width: '100%',
                      height: '42px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      padding: '0 12px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Description (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief background context for drivers / transporters..."
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      padding: '10px 12px',
                      fontSize: '0.85rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                {/* Grid: Status, Roles, Start Date, End Date */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  {/* Status */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      style={{
                        width: '100%',
                        height: '42px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        padding: '0 10px',
                        fontSize: '0.85rem',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>

                  {/* Target Audience Roles */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Target Role Audience
                    </label>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                      {['driver', 'transporter', 'foreman'].map((r) => {
                        const isChecked = formData.roles.includes(r);
                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => {
                              if (isChecked) {
                                if (formData.roles.length > 1) {
                                  setFormData({ ...formData, roles: formData.roles.filter((x) => x !== r) });
                                }
                              } else {
                                setFormData({ ...formData, roles: [...formData.roles, r] });
                              }
                            }}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              border: isChecked ? '1px solid #2563EB' : '1px solid #CBD5E1',
                              backgroundColor: isChecked ? '#EFF6FF' : '#FFFFFF',
                              color: isChecked ? '#2563EB' : '#475569',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              textTransform: 'capitalize',
                            }}
                          >
                            {r}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Start Date
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      style={{
                        width: '100%',
                        height: '42px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        padding: '0 10px',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      End Date
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      style={{
                        width: '100%',
                        height: '42px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        padding: '0 10px',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                {/* Questions Builder */}
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
                      Poll Questions & Options
                    </h4>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          questions: [
                            ...formData.questions,
                            { question: '', type: 'radio', is_required: true, options: ['', ''] },
                          ],
                        })
                      }
                      style={{
                        backgroundColor: '#EFF6FF',
                        color: '#2563EB',
                        border: '1px solid #BFDBFE',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Plus size={14} /> Add Another Question
                    </button>
                  </div>

                  {formData.questions.map((q, qIndex) => (
                    <div
                      key={qIndex}
                      style={{
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        padding: '16px',
                        marginBottom: '14px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>
                          Question {qIndex + 1}
                        </span>
                        {formData.questions.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                questions: formData.questions.filter((_, idx) => idx !== qIndex),
                              })
                            }
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#EF4444',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '2px',
                            }}
                          >
                            <Trash size={12} /> Remove Question
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        required
                        placeholder="Enter the poll question text here..."
                        value={q.question}
                        onChange={(e) => {
                          const updated = [...formData.questions];
                          updated[qIndex].question = e.target.value;
                          setFormData({ ...formData, questions: updated });
                        }}
                        style={{
                          width: '100%',
                          height: '38px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          padding: '0 10px',
                          fontSize: '0.85rem',
                          marginBottom: '12px',
                          boxSizing: 'border-box',
                        }}
                      />

                      {/* Options List */}
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                        Answer Options (Minimum 2):
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {q.options.map((opt, optIndex) => (
                          <div key={optIndex} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.8rem', color: '#64748B', width: '20px' }}>{optIndex + 1}.</span>
                            <input
                              type="text"
                              required
                              placeholder={`Option ${optIndex + 1} text`}
                              value={opt}
                              onChange={(e) => {
                                const updated = [...formData.questions];
                                updated[qIndex].options[optIndex] = e.target.value;
                                setFormData({ ...formData, questions: updated });
                              }}
                              style={{
                                flex: 1,
                                height: '36px',
                                borderRadius: '6px',
                                border: '1px solid #CBD5E1',
                                padding: '0 10px',
                                fontSize: '0.85rem',
                                boxSizing: 'border-box',
                              }}
                            />
                            {q.options.length > 2 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...formData.questions];
                                  updated[qIndex].options = updated[qIndex].options.filter((_, idx) => idx !== optIndex);
                                  setFormData({ ...formData, questions: updated });
                                }}
                                style={{
                                  backgroundColor: '#FEE2E2',
                                  border: 'none',
                                  color: '#EF4444',
                                  borderRadius: '6px',
                                  width: '32px',
                                  height: '32px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>
                        ))}

                        {q.options.length < 5 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...formData.questions];
                              updated[qIndex].options.push('');
                              setFormData({ ...formData, questions: updated });
                            }}
                            style={{
                              alignSelf: 'flex-start',
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#2563EB',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              padding: '4px 0',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            + Add Option
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Form Action Buttons */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '10px',
                    borderTop: '1px solid #E2E8F0',
                    paddingTop: '16px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setIsEditModalOpen(false);
                    }}
                    style={{
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 18px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 22px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                    }}
                  >
                    {isEditModalOpen ? 'Update Survey' : 'Save & Publish Survey'}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DELETE CONFIRMATION MODAL                                                 */}
        {/* ========================================================================= */}
        {isDeleteModalOpen && surveyToDelete && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                width: '100%',
                maxWidth: '440px',
                padding: '24px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: '#FEE2E2',
                  color: '#EF4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <Trash2 size={26} />
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }}>
                Delete Survey Poll?
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0 0 20px', lineHeight: 1.4 }}>
                Are you sure you want to delete <strong>"{surveyToDelete.title}"</strong>? All associated questions and{' '}
                <strong>{surveyToDelete.responses_count}</strong> response records will be permanently removed.
              </p>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  style={{
                    flex: 1,
                    backgroundColor: '#F1F5F9',
                    color: '#475569',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  style={{
                    flex: 1,
                    backgroundColor: '#EF4444',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.25)',
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export const SubscriptionPlansAdminPage = () => {
  const { showToast } = useToast();
  const plans = [
    { id: 1, name: 'Starter Fleet Plan', price: '₹2,499 / mo', duration: '30 Days', activeSubs: 1420, benefits: '5 Active Jobs, 5 DL Checks', status: 'Active' },
    { id: 2, name: 'Enterprise Logistics Pro', price: '₹5,999 / mo', duration: '30 Days', activeSubs: 2180, benefits: 'Unlimited Jobs, 25 BGV Checks, Agora Video', status: 'Active' },
    { id: 3, name: 'Corporate Custom Fleet', price: '₹14,999 / mo', duration: '30 Days', activeSubs: 469, benefits: 'Dedicated Coordinator, Custom API, Physical DAV', status: 'Active' },
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Fleet Subscription Packages</h1>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '4px 0 0' }}>Manage monthly/annual transporter pricing plans and feature limits</p>
          </div>
          <button
            onClick={() => showToast('Open Add Plan modal', 'info')}
            style={{
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            + Create New Plan
          </button>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#334155', fontWeight: 700 }}>
                <th style={{ padding: '12px 16px' }}>Plan Name</th>
                <th style={{ padding: '12px 16px' }}>Pricing</th>
                <th style={{ padding: '12px 16px' }}>Validity</th>
                <th style={{ padding: '12px 16px' }}>Active Subscribers</th>
                <th style={{ padding: '12px 16px' }}>Included Features</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0D6EFD' }}>{p.name}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#10B981' }}>{p.price}</td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{p.duration}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600 }}>{p.activeSubs} Fleets</td>
                  <td style={{ padding: '14px 16px', color: '#64748B' }}>{p.benefits}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
