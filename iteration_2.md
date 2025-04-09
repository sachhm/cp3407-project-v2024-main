# Actual iteration-2 board, (see chapters 3 and 4), add your start and end dates 

Checklist: 
1. github entry timestamps
2. User stories are correct: see p39

* Assumed Velocity: 5 days/week (same as iteration-1)
* Number of developers: 2
* Total estimated amount of work: 15 days


User stories or tasks (see chapter 4):
1. * [Make a Booking](./user_stories/making_a_booking.md)| Priority: 10 | Estimate: 4 days
2. * [Manage Availability](./user_stories/making_availability.md)| Priority: 10 | Estimate: 5 days
3. * [Manage Providers](./user_stories/making_providers.md)| Priority: 10 | Estimate: 3 days
4. * [Generate Analytics](./user_stories/generate_platform_analytics.md)| Priority: 8 | Estimate: 3 days
5. * [Process Payments](./user_stories/make_a_payment.md)| Priority: 2 | Estimate: 4 days
6. * [View Analytics](./user_stories/view_analytics.md)| Priority: 5 | Estimate: 3 days


In progress:
* Task-2 (developer name or initials), date started

Completed:
* Make a Booking (JK), 05/04/2025
* Manage Availability (SM), 29/03/2025
* Process Payments (JK), 01/04/2025
* Manage Providers (SM), 03/04/2025
* Generate Analytics (SM), 30/03/2025


### Burn Down for iteration-2 (see chapter 4):
* 4 weeks left, 15 days of estimated amount of work
* 2 weeks left, 7 days
* 1 week left, 2 days
* 0 weeks left, 0 days
* Actual Velocity: 3.75 days/week

# Retrospective for Iteration 2

## What Went Well
- **Core functionality completed ahead of expectations:** Key user stories such as *Make a Booking*, *Manage Availability*, and *Manage Providers* were not only completed on time but delivered with stable, tested implementations.
- **Successful Payment Integration:** The Stripe-powered payment system was integrated without major issues and is now fully functional, meeting both security and usability standards.
- **Productivity remained consistent:** Despite the slightly lower velocity than planned (3.75 days/week), all high-priority tasks were completed within the iteration timeframe.
- **Collaborative development and workload split:** Both developers contributed effectively across frontend and backend tasks, minimizing bottlenecks.

## Areas for Improvement
- **Analytics features fell short of full delivery:** The *View Analytics* story remained in progress at the end of the sprint, partly due to complexities in handling real-time data and dashboard rendering.
- **Time estimation accuracy:** The original estimate of 15 days may have slightly underestimated the time needed for analytics work, especially as it involved both backend data aggregation and frontend charting.
- **Code review lag:** Some pull requests remained open longer than expected due to overlapping responsibilities and reduced meeting frequency in Week 3.

## Proposed Action Plan for Next Iteration
- **Complete and refine View Analytics:** Finalize this in the first few days of Iteration 3, including dashboard export and advanced metrics.
- **Improve estimation for multi-layered stories:** Break down analytics-related stories into backend and frontend subtasks during sprint planning for more accurate scope and velocity tracking.
- **Reinforce code review cadence:** Implement a “24-hour rule” to ensure pull requests are reviewed and merged in a timely manner.
- **Introduce automated test coverage for data-driven features** to avoid regressions as analytics complexity grows.
