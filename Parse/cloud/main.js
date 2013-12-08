/*jslint white: true, browser: true, devel: true, windows: true, forin: true, vars: true, nomen: true, plusplus: true, bitwise: true, regexp: true, sloppy: true, indent: 4, maxerr: 50, unused: false */
/*global Parse: true, require: true, console: true */

// Classes: Parse.User, UserProfile, UserProfileImage, Tag, Location, FeatureSchedule

// UserProfile: Holds properties not held in Parse.User by default. Their work location can be specified as a GeoPoint so that it will be
// possible to support distance awareness for users to help users find others and locations of interest nearby. (meetups, co-working spaces)

// UserProfileImage: Specifies 1 or more images associated with a UserProfile (sort order and default can be specified)

// UserProfileType: A user profile will be assigned to 1 or more types, like developers and women. (lowercase)
// The initial list will be developers, designers, founders, females, executives, investors, business people, educators, mentors.
// This list will be strictly managed and users will not be able to create adhoc types.

// Tag: A UserProfile will have a Relation to Tag instances where tags are made public when there are many in use (though still searchable?)
// Initial tags will include programming languages and other disciplines and will be lowercase. User will be able to create adhoc tags.
// Once a tag is commonly used it will be promoted to being public. A profile also needs a token for the URL to identify them which should be 
// made up on their name and possibly a uniquely generated key to allow for duplicate names across the system.

// Location: A Location will specify an area within a city like a neighborhood including coodindates like a KML shape file.

// FeatureSchedule: A feature schedule will define which UserProfile to feature each day, with a job running weekly to set them in advance
// and inform users when they will be featured, possibly allowing them to defer being featured or make their profile as not public which
// would select someone else to be featured in their place. If a user changes their profile to not be public the day they are being featured
// the most recently featured profile which is still public can be shown. It will be important to adapt to profiles which are set to not be public.

require('cloud/app.js');

require('cloud/modules/users.js');
require('cloud/modules/userProfiles.js');
require('cloud/modules/userProfileImages.js');
require('cloud/modules/tags.js');
require('cloud/modules/locations.js');

require('cloud/modules/afterSave.js');
require('cloud/modules/backgroundJobs.js');
