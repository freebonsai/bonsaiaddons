// var GL11 = Java.type("org.lwjgl.opengl.GL11"); //using var so it goes to global scope

// var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");


// register("renderWorld", () => {
//     px = Math.floor(Player.getX())
//     py = Math.floor(Player.getY())
//     pz = Math.floor(Player.getZ())
//     GL11.glBlendFunc(770, 771);
//     GL11.glEnable(GL11.GL_BLEND);
//     GL11.glLineWidth(10);
//     //GL11.glDisable(GL11.GL_DEPTH_TEST);
//     GL11.glDisable(GL11.GL_TEXTURE_2D);
//     GlStateManager.func_179094_E();
    
//     Tessellator.begin(GL11.GL_LINE_STRIP).colorize(255, 255, 255, 1);
//     Tessellator.pos(px, py, pz);
//     Tessellator.pos(px+10, py, pz+10);
//     Tessellator.draw();
    
//     GlStateManager.func_179121_F();
//     GL11.glEnable(GL11.GL_TEXTURE_2D);
//     //phasGL11.glEnable(GL11.GL_DEPTH_TEST);
//     GL11.glDisable(GL11.GL_BLEND);
// })