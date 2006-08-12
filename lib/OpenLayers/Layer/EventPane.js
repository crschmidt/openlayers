/* Copyright (c) 2006 MetaCarta, Inc., published under the BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the full
 * text of the license. */
/**
 * @class
 */
OpenLayers.Layer.EventPane = Class.create();
OpenLayers.Layer.EventPane.prototype = Object.extend(new OpenLayers.Layer, {
    /** EventPaned layers are always base layers, by necessity.
    * @type Boolean
    */
    isBaseLayer: true,

    /** EventPaned layers are fixed by default.
    * @type Boolean
    */
    isFixed: true,

    /** 
    * @type HTMLDOMElement
    */
    pane: null,

    /**
     * @constructor
     * 
     * @param {String} name
     * @param {Object} options Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, options) {
        if (arguments.length > 0) {
            OpenLayers.Layer.prototype.initialize.apply(this, arguments);
            if (this.pane == null) {
                this.pane = OpenLayers.Util.createDiv();
                this.pane.style.width = "100%";
                this.pane.style.height = "100%";
                this.pane.style.backgroundColor = "transparent";
            }
        }
    },
    
    /** Set the map property for the layer. This is done through an accessor
     *   so that subclasses can override this and take special action once 
     *   they have their map variable set. 
     * 
     * @param {OpenLayers.Map} map
     */
    setMap: function(map) {
        OpenLayers.Layer.prototype.setMap.apply(this, arguments);
        this.pane.style.zIndex = parseInt(this.div.style.zIndex) + 1;
        this.pane.style.display = this.div.style.display;
        if (this.isFixed) {
            this.map.viewPortDiv.appendChild(this.pane);
        } else {
            this.map.layerContainerDiv.appendChild(this.pane);
        }
        this.map.events.attachToElement(this.pane);
    },
  
    /** 
     * @param {Boolean} visible
     * @param {Boolean} noEvent
     */
    setVisibility: function(visible, noEvent) {
        OpenLayers.Layer.prototype.setVisibility.apply(this, arguments);
        this.pane.style.display = this.div.style.display;
    },

    /** @final @type String */
    CLASS_NAME: "OpenLayers.Layer.EventPane"
});